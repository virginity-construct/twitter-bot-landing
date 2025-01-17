#!/bin/bash

# Deploy backend to Vercel
echo "Deploying backend to Vercel..."
cd backend
vercel --prod

# Deploy frontend to Vercel
echo "Deploying frontend to Vercel..."
cd ../frontend
vercel --prod

# Deploy database to Supabase
echo "Note: Make sure your Supabase database is set up at https://app.supabase.com"

echo "Deployment complete! Next steps:"
echo "1. Set up environment variables in Vercel"
echo "2. Configure Stripe webhooks"
echo "3. Set up Twitter API credentials"
echo "4. Configure Supabase connection"
