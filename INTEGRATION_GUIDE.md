# Backend Integration Guide

This document outlines the changes made to integrate the frontend with the backend API running on `localhost:5000`.

## Overview

The frontend has been fully integrated with the backend API. All mock data and localStorage-only functionality has been replaced with real API calls.

## API Configuration

**Base URL**: `http://localhost:5000/api`

The API base URL is configured in `/src/services/api.js` and can be easily changed if needed.

## Changes Made

### 1. API Service (`/src/services/api.js`)

Completely rewritten to connect to the backend:

- **Authentication**: JWT token-based authentication
  - Tokens are stored in localStorage as `affilia_token`
  - Automatically included in all authenticated requests via `Authorization: Bearer <token>` header

- **Endpoints Implemented**:
  - `POST /api/auth/login` - User login
  - `POST /api/auth/signup` - User registration
  - `GET /api/auth/google` - Google OAuth (redirects to backend)
  - `POST /api/products/upload-image` - Upload image for product search
  - `GET /api/products?query=` - Manual product search
  - `POST /api/favorites` - Add product to favorites
  - `GET /api/favorites` - Get user's favorites
  - `DELETE /api/favorites/:id` - Remove favorite
  - `PUT /api/profile` - Update user profile
  - `POST /api/profile/image` - Upload profile image
  - `GET /uploads/profiles/:filename` - Get profile images

### 2. Auth Context (`/src/context/AuthContext.jsx`)

Enhanced to work with backend:

- **Favorites Sync**: Automatically loads favorites from backend when user logs in
- **Real-time Updates**: Favorites are synced with backend on add/remove
- **Profile Image Upload**: New `uploadProfileImage` function for handling profile pictures
- **Token Management**: Handles JWT tokens for authenticated requests
- **Logout**: Properly clears user data and favorites on logout

### 3. Authentication Pages

#### Login (`/src/pages/auth/Login.jsx`)
- Integrated with backend login endpoint
- Google OAuth button now redirects to backend OAuth flow
- Proper error handling for failed login attempts

#### Signup (`/src/pages/auth/Signup.jsx`)
- Integrated with backend signup endpoint
- Google OAuth button functionality added
- Validation and error handling

### 4. Profile Pages

#### Profile View (`/src/pages/app/Profile.jsx`)
- Displays user avatar from backend
- Uses `getProfileImageUrl()` helper to construct proper image URLs
- Shows user information from backend

#### Account Edit (`/src/pages/app/Account.jsx`)
- Profile image upload with preview
- Separate API calls for image upload and profile updates
- Real-time preview of selected images
- Success/error message display

### 5. Product Features

#### Search (`/src/pages/app/Search.jsx`)
- Image upload for product search via backend
- Results displayed from backend response

#### Saved Items (`/src/pages/app/Saved.jsx`)
- Displays favorites from backend
- Real-time sync with backend

## Data Flow

### Authentication Flow
1. User submits login/signup form
2. Frontend sends credentials to backend
3. Backend returns JWT token + user data
4. Token stored in localStorage
5. User data stored in AuthContext
6. Favorites automatically loaded from backend

### Favorites Flow
1. User clicks favorite button on product
2. Frontend checks if already favorited
3. If not favorited: `POST /api/favorites` with productId
4. If favorited: `DELETE /api/favorites/:id`
5. Local state updated immediately
6. UI reflects change

### Profile Update Flow
1. User edits profile information
2. If image selected: Upload image first via `POST /api/profile/image`
3. Update other fields via `PUT /api/profile`
4. User data in AuthContext updated
5. UI reflects changes

## Storage

### LocalStorage Keys
- `affilia_user` - User data (synced with backend)
- `affilia_token` - JWT authentication token
- `affilia_saved` - Cached favorites (synced with backend)

## Error Handling

All API calls include proper error handling:
- Network errors are caught and displayed to users
- 401 errors should trigger logout (can be enhanced)
- Validation errors from backend are displayed in forms

## Image Handling

### Profile Images
- Uploaded via multipart/form-data
- Stored on backend in `/uploads/profiles/`
- Accessed via `http://localhost:5000/uploads/profiles/:filename`
- Helper function `getProfileImageUrl()` constructs full URLs

### Product Images
- Uploaded for search via multipart/form-data
- Backend processes and returns matching products

## Google OAuth

The Google OAuth flow:
1. User clicks "Continue with Google" button
2. Frontend redirects to `GET /api/auth/google`
3. Backend handles OAuth flow with Google
4. Backend redirects back to frontend with token
5. Frontend needs to handle the callback (implementation depends on backend)

## Running the Application

### Prerequisites
1. Backend server running on `http://localhost:5000`
2. Backend configured with proper CORS settings to allow frontend origin

### Start Frontend
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or configured port)

## Testing Checklist

- [ ] User can sign up with email/password
- [ ] User can log in with email/password
- [ ] User can upload and search products by image
- [ ] User can add/remove favorites
- [ ] Favorites persist across sessions
- [ ] User can update profile information
- [ ] User can upload profile picture
- [ ] Profile picture displays correctly
- [ ] Google OAuth redirects properly
- [ ] Logout clears all user data
- [ ] Error messages display for failed requests

## Future Enhancements

1. **Refresh Token**: Implement token refresh mechanism
2. **OAuth Callback**: Complete Google OAuth callback handling
3. **Error Interceptor**: Global error handling for 401/403 responses
4. **Loading States**: Add loading indicators for all API calls
5. **Optimistic Updates**: Update UI before API response for better UX
6. **Image Optimization**: Compress images before upload
7. **Retry Logic**: Automatic retry for failed requests
8. **Offline Support**: Cache data for offline access

## Troubleshooting

### CORS Errors
Ensure backend has CORS configured to allow requests from frontend origin:
```javascript
// Backend should have:
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### 401 Unauthorized
- Check if token is being sent in requests
- Verify token hasn't expired
- Ensure backend is validating tokens correctly

### Images Not Loading
- Verify backend static file serving is configured
- Check image URLs are constructed correctly
- Ensure uploads directory has proper permissions

### Favorites Not Syncing
- Check network tab for API call responses
- Verify user is authenticated
- Check backend favorites endpoints are working

## API Response Formats

### Login/Signup Response
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "gender": "male",
    "avatarUrl": "filename.jpg"
  }
}
```

### Products Response
```json
{
  "products": [
    {
      "id": "product_id",
      "name": "Product Name",
      "brand": "Brand Name",
      "price": 99.99,
      "year": 2024,
      "thumbnail": "image_url",
      "matched": true
    }
  ]
}
```

### Favorites Response
```json
{
  "favorites": [
    {
      "_id": "favorite_id",
      "productId": "product_id",
      "name": "Product Name",
      "brand": "Brand Name",
      "price": 99.99,
      "thumbnail": "image_url"
    }
  ]
}
```

### Profile Update Response
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "gender": "male",
    "avatarUrl": "filename.jpg"
  }
}
```

## Support

For issues or questions about the integration, check:
1. Browser console for errors
2. Network tab for failed requests
3. Backend logs for server errors
4. This documentation for expected behavior
