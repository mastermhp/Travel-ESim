# Quick Admin Setup Guide

## Option 1: Use the Browser (EASIEST)

1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3000/api/v1/admin/init`
3. This creates the admin user automatically
4. Login at: `http://localhost:3000/admin/login`
   - Email: `admin@travelesim.com`
   - Password: `Admin@123`

## Option 2: Use the Shell Script

\`\`\`bash
chmod +x create-admin.sh
./create-admin.sh
\`\`\`

## Option 3: Manual Command

\`\`\`bash
# On Mac/Linux
MONGODB_URI="mongodb+srv://travel_esim:Rrwig5m9P9Bzvem0@cluster0.9vxvrfy.mongodb.net/?appName=Cluster0" node scripts/seed-admin.js

# On Windows PowerShell
$env:MONGODB_URI="mongodb+srv://travel_esim:Rrwig5m9P9Bzvem0@cluster0.9vxvrfy.mongodb.net/?appName=Cluster0"; node scripts/seed-admin.js
\`\`\`

## Default Credentials

- Email: `admin@travelesim.com`
- Password: `Admin@123`

## Troubleshooting

If you get "Admin already exists" but can't login:
1. Check MongoDB Compass to verify the user exists
2. Try resetting the password in the database
3. Delete the admin user and run the init again
