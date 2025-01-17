from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from ..db.base_class import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    twitter_username = Column(String, unique=True, index=True)
    twitter_id = Column(String, unique=True, index=True)
    
    # Subscription
    stripe_customer_id = Column(String, unique=True, index=True)
    subscription_status = Column(String)  # active, inactive, trialing
    subscription_end_date = Column(DateTime)
    
    # Twitter OAuth
    twitter_access_token = Column(String)
    twitter_access_token_secret = Column(String)
    
    # Settings
    tweet_frequency = Column(Integer, default=5)  # tweets per day
    auto_dm_enabled = Column(Boolean, default=True)
    content_style = Column(String, default="professional")
    
    # Stats
    follower_count = Column(Integer, default=0)
    following_count = Column(Integer, default=0)
    tweet_count = Column(Integer, default=0)
    last_stats_update = Column(DateTime)
    
    # System
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    tweets = relationship("Tweet", back_populates="user")
    analytics = relationship("Analytics", back_populates="user")
