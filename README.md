# TweetGenie AI - Twitter Growth Assistant

## Deployment Guide

### Prerequisites
1. Vercel account (https://vercel.com)
2. Supabase account (https://supabase.com)
3. Stripe account (https://stripe.com)
4. Twitter Developer account (https://developer.twitter.com)

### Environment Variables
Create `.env` files in both backend and frontend directories:

```env
# Backend (.env)
DATABASE_URL=your_supabase_url
SECRET_KEY=your_secret_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
OPENAI_API_KEY=your_openai_api_key
FRONTEND_URL=https://your-frontend-url.vercel.app

# Frontend (.env)
REACT_APP_API_URL=https://your-backend-url.vercel.app
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

### Deployment Steps

1. **Deploy Database**
   ```bash
   # Create new Supabase project
   1. Go to https://app.supabase.com
   2. Create new project
   3. Get connection string
   4. Run migrations
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   vercel --prod
   ```

3. **Deploy Frontend**
   ```bash
   cd frontend
   vercel --prod
   ```

4. **Configure Stripe**
   ```bash
   1. Set up Stripe account
   2. Create subscription product
   3. Get API keys
   4. Configure webhooks
   ```

5. **Configure Twitter API**
   ```bash
   1. Create Twitter Developer account
   2. Create new app
   3. Get API keys
   4. Configure OAuth
   ```

### Post-Deployment

1. Test payment flow
2. Verify Twitter integration
3. Check analytics tracking
4. Monitor error reporting

## Development

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Testing
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## Support
Email: pjv.melb@gmail.com
Twitter: @TweetGenieAI
