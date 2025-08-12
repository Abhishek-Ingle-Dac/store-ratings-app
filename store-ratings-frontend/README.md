# Store Ratings Frontend (Vite + React — Plain JS + Plain CSS)

This frontend uses **in-memory tokens** (no token persisted). When the page reloads, the user will be logged out and must sign in again.

## Setup

1. Install dependencies:
```bash
cd store-ratings-frontend
npm install
```

2. Set API base (optional):
Create `.env` file:
```
VITE_API_BASE=http://localhost:5000/api
```

3. Run:
```bash
npm run dev
```

## Notes about auth (Option B — in-memory tokens)

- The backend must expose endpoints like:
  - `POST /api/auth/login` — returns `{ token, user }`
  - `POST /api/auth/signup`
- After login, the token is stored in memory and attached to outgoing requests in the `Authorization` header.
- Refreshing the page clears the token and logs the user out.

If you want cookie-based auth (HttpOnly cookies) instead, I can modify backend and frontend accordingly.
