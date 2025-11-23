# Admin User Setup Guide

## Method 1: Using npm script (Recommended)

Run the seed script using npm:

\`\`\`bash
npm install
npm run seed:admin
\`\`\`

This will load your `.env.local` file and create the admin user in MongoDB.

**Default Credentials:**
- Email: `admin@travelesim.com`
- Password: `Admin@123`

## Method 2: Automatic Initialization

Simply visit the admin login page at `/admin/login` and the system will automatically create the default admin user on first load.

## Method 3: Manual API Call

Make a POST request to initialize the admin:

\`\`\`bash
curl -X POST http://localhost:3000/api/v1/admin/init
\`\`\`

## Method 4: Direct Node Script

\`\`\`bash
node scripts/seed-admin.js
\`\`\`

## Environment Variables Required

Make sure your `.env.local` file contains:

\`\`\`bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://your-connection-string
MONGODB_DB_NAME=travel_esim

# JWT Configuration
JWT_SECRET=your-32-character-secret-key
\`\`\`

## Troubleshooting

### Error: "Please add your Mongo URI to .env file"
- Make sure `.env.local` exists in the root directory
- Verify `MONGODB_URI` is set correctly in `.env.local`
- Run `npm install` to ensure dotenv package is installed

### Admin already exists
If you see "Admin user already exists", you can login with the default credentials at `/admin/login`

### Cannot connect to MongoDB
- Check your MongoDB Atlas connection string is correct
- Ensure your IP address is whitelisted in MongoDB Atlas Network Access
- Verify the database user credentials are correct
- Test connection using MongoDB Compass or mongosh

## After Login

1. Login with the default credentials at `/admin/login`
2. Go to Settings tab in the admin dashboard
3. Change your password immediately
4. Configure authentication methods (Email, Phone OTP, Social logins)
5. Set MFA requirements

## Admin Features

- **Dashboard Overview**: Real-time metrics for revenue, orders, agents, and countries
- **User Management**: View and manage all registered users
- **Order Management**: Track all eSIM orders and transactions
- **Agent Management**: Monitor agent performance and commissions
- **Authentication Settings**: Configure login methods and MFA requirements
- **System Configuration**: Manage platform settings and data plans

## Security Notes

- The default password is for initial setup only
- Always change it after first login
- Enable MFA for additional security
- Regularly review admin action logs
- Never share admin credentials
