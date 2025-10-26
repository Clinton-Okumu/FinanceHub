# FinanceHub

A full-stack personal finance management application with a React Native mobile app and Node.js backend API. Track transactions, manage expenses, and monitor financial summaries with secure authentication.

## Architecture

- **Frontend**: React Native mobile app built with Expo
- **Backend**: Node.js REST API with Express
- **Database**: Neon (serverless PostgreSQL)
- **Caching/Rate Limiting**: Upstash Redis
- **Authentication**: Clerk (integrated in mobile app)

## Features

### Mobile App
- **Secure Authentication**: User registration and login with email verification
- **File-based Routing**: Seamless navigation with Expo Router
- **Cross-platform**: Runs on iOS, Android, and Web
- **Modern UI**: Clean design with custom styling and icons
- **Keyboard-aware Forms**: Optimized input handling for mobile devices
- **Safe Area Support**: Proper handling of device notches and safe areas

### Backend API
- **Transaction Management**: CRUD operations for financial transactions
- **User-specific Data**: Isolated data access per authenticated user
- **Rate Limiting**: Protected endpoints with Redis-based rate limiting
- **Financial Summaries**: Aggregated expense and revenue calculations
- **RESTful Design**: Clean API endpoints following REST principles

## Features

- **Secure Authentication**: User registration and login with email verification using Clerk
- **File-based Routing**: Seamless navigation with Expo Router
- **Cross-platform**: Runs on iOS, Android, and Web
- **Modern UI**: Clean design with custom styling and icons
- **Keyboard-aware Forms**: Optimized input handling for mobile devices
- **Safe Area Support**: Proper handling of device notches and safe areas

## Tech Stack

### Frontend (Mobile)
- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **Authentication**: Clerk
- **Styling**: React Native StyleSheet
- **Icons**: Expo Vector Icons
- **Images**: Expo Image
- **State Management**: React hooks
- **Development**: TypeScript support, ESLint

### Backend
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Database**: Neon Database (PostgreSQL)
- **Caching**: Upstash Redis
- **Rate Limiting**: @upstash/ratelimit
- **Development**: Nodemon for hot reloading

## Prerequisites

- Node.js 18+
- npm or yarn/pnpm
- Expo CLI (`npm install -g @expo/cli`)
- For mobile development:
  - For iOS: macOS with Xcode
  - For Android: Android Studio or Expo Go app
- Database: Neon account for PostgreSQL
- Redis: Upstash account for Redis

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd financehub
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   ```

3. Set up the mobile app:
   ```bash
   cd ../mobile
   npm install
   ```

4. Configure environment variables (see Environment Setup below)

## Environment Setup

### Backend (.env)
Create `backend/.env`:
```env
PORT=5001
DATABASE_URL=your_neon_database_url
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### Mobile App
- Create a Clerk application at [clerk.com](https://clerk.com)
- Add your Clerk publishable key to `mobile/.env` or Expo environment variables

## Usage

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon
```

### Mobile App Development
```bash
cd mobile
npm start
```

Available mobile commands:
- `npm start` - Start development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm run lint` - Lint code

### API Endpoints

Base URL: `http://localhost:5001/api`

#### Transactions
- `GET /transactions/:user_id` - Get user's transactions
- `POST /transactions` - Create new transaction
- `DELETE /transactions/:id` - Delete transaction by ID
- `GET /transactions/summary/:user_id` - Get financial summary

### Building for Production

1. Configure `app.json` for production
2. Build with EAS:
   ```bash
   npx eas build --platform ios
   npx eas build --platform android
   ```

## Project Structure

```
financehub/
├── backend/                    # Node.js API server
│   ├── src/
│   │   ├── config/            # Database and Redis config
│   │   ├── controllers/       # Business logic
│   │   ├── middleware/        # Rate limiting
│   │   ├── routes/           # API routes
│   │   └── server.js         # Express app setup
│   ├── .env                  # Environment variables
│   └── package.json          # Backend dependencies
├── mobile/                    # React Native app
│   ├── app/                  # Expo Router app directory
│   │   ├── (auth)/           # Authentication routes
│   │   ├── (root)/           # Protected routes
│   │   └── _layout.jsx       # Root layout
│   ├── components/           # Reusable components
│   ├── constants/            # App constants
│   ├── assets/               # Images and styles
│   ├── app.json              # Expo configuration
│   └── package.json          # Mobile dependencies
└── README.md                # This file
```
financehub/mobile/
├── app/                    # Expo Router app directory
│   ├── (auth)/            # Authentication routes
│   │   ├── _layout.jsx    # Auth layout with redirects
│   │   ├── sign-in.jsx    # Sign in screen
│   │   └── sign-up.jsx    # Sign up screen
│   ├── (root)/            # Protected routes
│   │   ├── _layout.tsx    # Root layout with auth check
│   │   └── index.jsx      # Home screen
│   ├── _layout.jsx        # Root layout with providers
│   └── assets/            # Static assets
├── components/            # Reusable components
│   └── SafeScreen.jsx     # Safe area wrapper
├── constants/             # App constants
│   └── colors.js          # Color scheme
├── lib/                   # Utilities
│   └── utils.js           # Helper functions
├── assets/                # Images and styles
│   ├── images/            # App images
│   └── styles/            # Style files
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Authentication Flow

1. **Mobile App**: Users authenticate via Clerk in the React Native app
2. **Token Management**: Clerk handles JWT tokens and session management
3. **API Access**: Mobile app includes user tokens in API requests
4. **Backend Verification**: API validates user identity for data access

## Database Schema

### Transactions Table
```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  type VARCHAR(20) CHECK (type IN ('income', 'expense')),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment

### Backend
- Deploy to services like Railway, Render, or Vercel
- Set environment variables in deployment platform
- Ensure database connectivity

### Mobile App
1. Configure `app.json` for production
2. Build with EAS (see Building for Production above)
3. Submit to app stores

## Customization

### Colors
Edit `constants/colors.js` to customize the app's color scheme.

### Styles
Modify styles in `assets/styles/` for UI customization.

### Routes
Add new screens by creating files in the `app/` directory following Expo Router conventions.

## Troubleshooting

### Common Backend Issues
- **Database connection**: Verify Neon credentials and network access
- **Redis errors**: Check Upstash configuration
- **Port conflicts**: Ensure PORT 5001 is available

### Common Mobile Issues
- **Metro bundler**: Clear cache with `npx expo start --clear`
- **Authentication**: Verify Clerk keys and configuration
- **Build failures**: Update Expo CLI and dependencies

### Performance Tips
- Use `React.memo` for expensive components
- Optimize images with appropriate sizes
- Implement proper loading states

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with descriptive messages
5. Push to your fork and create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues:
- **Backend**: Check Express.js and Neon documentation
- **Mobile**: Refer to Expo and React Native docs
- **Authentication**: Visit Clerk documentation
- Open issues on GitHub for project-specific help

---

Built with ❤️ using React Native and Expo
