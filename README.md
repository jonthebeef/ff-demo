# LAPP Demo App

A minimal Next.js app demonstrating the **LAPP framework**: **Landing Page → Authentication → Payments → Product**.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Clerk** for authentication
- **Stripe** for payments (test mode)
- **No database** - uses Clerk metadata for persistence

## Features

- Landing page with sign-in CTA
- Clerk authentication
- Stripe subscription checkout (£10/month)
- Protected dashboard for paid users
- Persistent paid status via Clerk publicMetadata
- Manual activation fallback for demo purposes

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── checkout/route.ts         # Creates Stripe Checkout Session
│   │   ├── webhook/stripe/route.ts   # Handles Stripe webhooks
│   │   └── mock/activate/route.ts    # Manual activation fallback
│   ├── dashboard/page.tsx            # Product area (paid only)
│   ├── upgrade/page.tsx              # Pricing & upgrade page
│   ├── success/page.tsx              # Post-payment success page
│   ├── page.tsx                      # Landing page
│   └── layout.tsx                    # Root layout with ClerkProvider
├── components/
│   ├── UpgradeButton.tsx             # Client component for checkout
│   └── ActivateButton.tsx            # Manual activation button
├── lib/
│   └── clerk.ts                      # Clerk utility functions
├── middleware.ts                     # Auth & access control
├── .env.local.example                # Environment variables template
└── package.json
```

## Quickstart

### 1. Clone and Install

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in your `.env.local` with the following:

**Clerk** (from https://dashboard.clerk.com):
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

**Stripe** (from https://dashboard.stripe.com/test):
- `STRIPE_SECRET_KEY` (starts with `sk_test_`)
- `STRIPE_PRICE_ID` (create a subscription product, then copy the Price ID starting with `price_`)
- `STRIPE_WEBHOOK_SECRET` (you'll get this in step 4)

**Site URL**:
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

### 3. Start the Development Server

```bash
npm run dev
```

The app will be running at http://localhost:3000

### 4. Set Up Stripe Webhook Listener

Open a **new terminal** and run:

```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

This will output a webhook signing secret starting with `whsec_...`

Copy that value and add it to your `.env.local`:

```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

**Restart** the dev server (`npm run dev`) to pick up the new environment variable.

### 5. Test the Flow

1. Go to http://localhost:3000
2. Click **Sign In** (create a test account or sign in)
3. Click **Upgrade to Premium**
4. Click **Upgrade Now**
5. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
6. Complete the payment
7. You'll land on the **Success** page
8. Click **Go to Dashboard** to access the premium product area

### 6. If Webhook Doesn't Fire

If the webhook doesn't process (you can't access `/dashboard`), click the **Activate Access** button on the success page. This manually marks you as paid.

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/upgrade` | Auth required | Pricing & checkout |
| `/dashboard` | Paid only | Product area |
| `/success` | Auth required | Post-payment confirmation |
| `/api/checkout` | POST (auth) | Create Checkout Session |
| `/api/webhook/stripe` | POST (Stripe) | Process webhooks |
| `/api/mock/activate` | POST (auth) | Manual activation |

## How It Works

### Authentication
- Clerk handles all authentication
- Middleware protects `/upgrade`, `/dashboard`, and `/success`
- Unauthenticated users are redirected to `/`

### Payments
- Stripe Checkout in subscription mode
- `/api/checkout` creates a session and returns `{ id, url }`
- Client component redirects to Stripe Checkout
- After payment, user returns to `/success`

### Persistence
- Paid status is stored in Clerk's `publicMetadata.isPaid`
- This persists across dev server restarts
- Webhook sets `isPaid: true` on successful payment
- `/dashboard` checks this metadata to grant access

### Manual Fallback
- If webhook fails/delays, use the **Activate Access** button
- Calls `/api/mock/activate` to manually mark user as paid
- Useful for demos without Stripe CLI running

## Gotchas

1. **Blank screen after upgrade?** Make sure `/api/checkout` returns JSON and the client handles the redirect.
2. **Paid status not persisting?** Using Clerk metadata (not in-memory storage) solves this.
3. **Webhook not working?** Make sure `stripe listen` is running and `STRIPE_WEBHOOK_SECRET` is set correctly.
4. **Can't access dashboard?** Use the manual activation button on the success page.

## Environment Variables

See `.env.local.example` for the full list:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
STRIPE_SECRET_KEY=
STRIPE_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## License

MIT
