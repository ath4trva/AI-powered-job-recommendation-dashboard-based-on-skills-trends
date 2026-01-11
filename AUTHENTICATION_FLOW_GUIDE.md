# Authentication & Step Wizard Flow Implementation

## Overview
This document explains the updated authentication and onboarding flow for the Job Recommendation Dashboard.

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER JOURNEY                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  First Visit                                                     │
│  ├─ Show Login/Signup Page (defaults to Signup)                │
│  ├─ User fills Name, Email, Password                           │
│  └─ Creates new account                                         │
│                                                                  │
│  After Signup (isAuthenticated = true, hasCompletedWizard = false)
│  ├─ Show Step Wizard                                            │
│  │  ├─ Step 1: Select Roles                                    │
│  │  ├─ Step 2: Salary Range                                    │
│  │  ├─ Step 3: Top Skills                                      │
│  │  ├─ Step 4: Culture & Work Type                             │
│  │  ├─ Step 5: Upload Resume (optional, one-time)              │
│  │  └─ Step 6: Review & Submit                                 │
│  └─ On Completion:                                              │
│     ├─ markWizardComplete() called                              │
│     ├─ hasCompletedWizard set to true                           │
│     └─ Preferences saved in localStorage                        │
│                                                                  │
│  After Wizard Completion (isAuthenticated = true, hasCompletedWizard = true)
│  └─ Show Dashboard (Main Content, Swipe, Saved Jobs)            │
│                                                                  │
│  Returning User (Server back online)                            │
│  ├─ Show Login/Signup Page                                      │
│  ├─ User enters Email & Password                               │
│  └─ If user exists:                                             │
│     ├─ isAuthenticated = true                                   │
│     ├─ hasCompletedWizard = true (from localStorage)            │
│     └─ Show Dashboard directly (NO Step Wizard)                 │
│                                                                  │
│  Logout                                                          │
│  └─ All auth data cleared from localStorage                     │
│     Next login: User must sign up or login again                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Key Components & Files Modified

### 1. **Types** ([src/types/index.ts](src/types/index.ts))
Updated `User` interface:
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: UserPreferences;
  stats?: UserStats;
  hasCompletedWizard?: boolean;      // NEW: Track wizard completion
  createdAt?: Date;                   // NEW: Account creation date
  isNewUser?: boolean;                // NEW: Differentiate new vs existing users
}
```

### 2. **AuthContext.shared.ts** ([src/contexts/AuthContext.shared.ts](src/contexts/AuthContext.shared.ts))
Enhanced context interface:
```typescript
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedWizard: boolean;        // NEW: Wizard completion status
  login: (email: string, password: string) => Promise<{ isNewUser: boolean; user: User }>;
  signup: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  markWizardComplete: () => Promise<void>;  // NEW: Mark wizard as done
  updateUserPreferences: (preferences: UserPreferences) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}
```

### 3. **AuthContext.tsx** ([src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx))
New provider implementation with:
- `signup()`: Creates new user account
- `login()`: Authenticates existing users
- `markWizardComplete()`: Called after wizard completion
- Persistent localStorage management
- User lookup by email for login

### 4. **Login Component** ([src/components/Auth/Login.tsx](src/components/Auth/Login.tsx))
Completely rewritten with:
- Default to **Signup mode** for first-time visitors
- Separate signup/login logic
- Error handling and validation
- Loading states
- Better UX with mode switching
- Uses AuthContext methods directly

### 5. **StepWizard Component** ([src/components/Onboarding/StepWizard.tsx](src/components/Onboarding/StepWizard.tsx))
Updated to:
- Call `markWizardComplete()` on submission
- Integrate with AuthContext
- Properly track completion status
- Save preferences before marking complete

### 6. **App.tsx** ([src/App.tsx](src/App.tsx))
Updated routing logic:
```tsx
// 1. Not authenticated → Show Login/Signup
if (!isAuthenticated) {
  return <Login onAuthSuccess={handleAuthSuccess} />
}

// 2. Authenticated but wizard not completed → Show StepWizard
if (!hasCompletedWizard) {
  return <StepWizard onComplete={handleOnboardingComplete} />
}

// 3. Authenticated AND wizard completed → Show Dashboard
return <MainContent ... />
```

### 7. **main.tsx** ([src/main.tsx](src/main.tsx))
Wrapped App with AuthProvider:
```tsx
<StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
</StrictMode>
```

### 8. **useAuth Hook** ([src/hooks/useAuth.ts](src/hooks/useAuth.ts))
Custom hook for easy auth context access (optional but recommended):
```typescript
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## LocalStorage Keys

The application uses these localStorage keys:

| Key | Purpose | Example Value |
|-----|---------|------------------|
| `user` | Current logged-in user | JSON string of User object |
| `user_{email}` | User lookup by email | JSON string of User object (for login) |
| `isAuthenticated` | Authentication status | `"true"` or `"false"` |
| `hasCompletedWizard` | Wizard completion status | `"true"` or `"false"` |
| `userPreferences` | User preferences/job filters | JSON string of UserPreferences |

## Usage Examples

### Example 1: First-Time User Flow
```typescript
// 1. User signs up
await signup("John Doe", "john@example.com", "password123");
// Result: isAuthenticated = true, hasCompletedWizard = false

// 2. StepWizard automatically shown
// User completes all steps and submits

// 3. StepWizard calls onComplete callback
handleOnboardingComplete(preferences);

// 4. App calls markWizardComplete()
await markWizardComplete();
// Result: isAuthenticated = true, hasCompletedWizard = true

// 5. Dashboard automatically shown
```

### Example 2: Returning User Flow
```typescript
// Server was down, now back up
// User starts app → sees Login page

// 1. User logs in
await login("john@example.com", "password123");
// Check: User exists in localStorage → login succeeds
// Result: isAuthenticated = true, hasCompletedWizard = true (restored from localStorage)

// 2. Dashboard automatically shown (NO Step Wizard)
```

### Example 3: Logout & Re-login
```typescript
// User logs out
logout();
// Result: All localStorage cleared, isAuthenticated = false

// User can signup as new user or login with existing credentials
```

## Server Resilience

The implementation handles server downtime gracefully:

1. **User Data Persisted**: All user data stored in localStorage survives server downtime
2. **Session Persistence**: User remains logged in across browser refreshes
3. **Wizard Status Tracked**: Completing the wizard is persisted
4. **New Server Session**: 
   - If new user: Must signup again + complete wizard
   - If existing user: Can login immediately and go to dashboard

## Security Notes

⚠️ **Important**: This is a frontend-only implementation. For production:

1. **Password Hashing**: Use proper password hashing (bcrypt, argon2)
2. **JWT Tokens**: Use JWT or session tokens instead of plain localStorage
3. **HTTPS**: Always use HTTPS
4. **Backend Validation**: Validate all user inputs on the backend
5. **Rate Limiting**: Implement rate limiting on login/signup endpoints
6. **Email Verification**: Add email verification for new signups
7. **Password Reset**: Implement password reset functionality

## Testing the Flow

### Test Case 1: New User Signup
1. Clear localStorage
2. App loads → Shows Login (Signup mode)
3. Fill in name, email, password → Click "Create Account"
4. Should show StepWizard
5. Complete all steps → Click "Submit"
6. Should show Dashboard
7. Refresh page → Should still show Dashboard (wizard complete)

### Test Case 2: Returning User Login
1. (Assuming Test Case 1 completed)
2. Clear localStorage only (simulating server down)
3. App loads → Shows Login (Signup mode)
4. Switch to Login mode
5. Enter email & password from Test Case 1
6. Should show Dashboard directly (NO wizard)

### Test Case 3: Logout
1. On Dashboard, find logout button (in Navbar)
2. Click Logout
3. App should show Login page
4. Signup/Login should work as expected

## Troubleshooting

### Issue: User always sees Login page
- **Check**: Is `isAuthenticated` from AuthContext true?
- **Solution**: Verify localStorage has `user` and `isAuthenticated` keys

### Issue: User sees Step Wizard after returning
- **Check**: Is `hasCompletedWizard` from AuthContext true?
- **Solution**: Verify localStorage has `hasCompletedWizard` set to "true"

### Issue: Preferences not saved
- **Check**: Is `onComplete` callback being called in StepWizard?
- **Solution**: Verify `handleOnboardingComplete` is saving to localStorage

### Issue: Login fails
- **Check**: Does `user_{email}` exist in localStorage?
- **Solution**: User must signup first; existing users need correct email stored

## Future Enhancements

1. **API Integration**: Replace localStorage with backend API calls
2. **Email Verification**: Send verification email on signup
3. **Password Reset**: Implement forgot password flow
4. **Social Login**: Add Google/GitHub OAuth
5. **2FA**: Two-factor authentication for security
6. **Profile Updates**: Allow users to modify preferences after onboarding
7. **Analytics**: Track user signup/login flows for metrics
