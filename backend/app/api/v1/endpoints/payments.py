from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import stripe
from ....core.config import get_settings
from ....db.session import get_db
from ....models.user import User
from ....services.user_service import get_current_user
from datetime import datetime, timedelta

router = APIRouter()
settings = get_settings()
stripe.api_key = settings.STRIPE_SECRET_KEY

@router.post("/create-checkout-session")
async def create_checkout_session(
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # Create or get Stripe customer
        if not current_user.stripe_customer_id:
            customer = stripe.Customer.create(
                email=current_user.email,
                metadata={"user_id": str(current_user.id)}
            )
            current_user.stripe_customer_id = customer.id
            db.commit()
        
        # Create checkout session
        checkout_session = stripe.checkout.Session.create(
            customer=current_user.stripe_customer_id,
            payment_method_types=["card"],
            line_items=[{
                "price": settings.STRIPE_PRICE_ID,
                "quantity": 1
            }],
            mode="subscription",
            success_url=f"{settings.FRONTEND_URL}/dashboard?success=true",
            cancel_url=f"{settings.FRONTEND_URL}/dashboard?canceled=true",
            metadata={
                "user_id": str(current_user.id)
            }
        )
        
        return {"url": checkout_session.url}
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    try:
        # Get the webhook secret
        webhook_secret = settings.STRIPE_WEBHOOK_SECRET
        
        # Get the webhook data
        payload = await request.body()
        sig_header = request.headers.get("stripe-signature")
        
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid payload")
        except stripe.error.SignatureVerificationError:
            raise HTTPException(status_code=400, detail="Invalid signature")
        
        # Handle the event
        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            await handle_checkout_session(session, db)
            
        elif event["type"] == "customer.subscription.updated":
            subscription = event["data"]["object"]
            await handle_subscription_updated(subscription, db)
            
        elif event["type"] == "customer.subscription.deleted":
            subscription = event["data"]["object"]
            await handle_subscription_deleted(subscription, db)
            
        return {"status": "success"}
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

async def handle_checkout_session(session: dict, db: Session):
    """Handle successful checkout session"""
    user_id = session["metadata"]["user_id"]
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        return
    
    # Update subscription status
    user.subscription_status = "active"
    user.subscription_end_date = datetime.now() + timedelta(days=30)
    db.commit()

async def handle_subscription_updated(subscription: dict, db: Session):
    """Handle subscription update"""
    customer_id = subscription["customer"]
    user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
    
    if not user:
        return
    
    # Update subscription status
    status = subscription["status"]
    current_period_end = datetime.fromtimestamp(subscription["current_period_end"])
    
    user.subscription_status = status
    user.subscription_end_date = current_period_end
    db.commit()

async def handle_subscription_deleted(subscription: dict, db: Session):
    """Handle subscription cancellation"""
    customer_id = subscription["customer"]
    user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
    
    if not user:
        return
    
    # Update subscription status
    user.subscription_status = "canceled"
    user.subscription_end_date = datetime.now()
    db.commit()
