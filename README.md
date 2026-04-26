# Online Family Album

A private Next.js family photo website for Jamie and Tin to share family albums
with family and close friends.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase Auth
- Firestore
- Framer Motion
- Lucide React

## Local Setup

Install dependencies:

```bash
npm install
```

Copy the Firebase env template and add the public Firebase web app config:

```bash
cp .env.example .env.local
```

Required values:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=shared-e617d.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=shared-e617d
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=shared-e617d.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Firebase

Enable Email/Password sign-in in Firebase Auth. Deploy the included Firestore
rules so private album data is readable only by signed-in users:

```bash
firebase deploy --only firestore:rules
```

The first version stores album metadata in `src/lib/albums.ts`; the structure
matches the intended Firestore `albums` collection so it can move there later.

## Version One

- Public homepage with warm intro and preview images
- Family question gate before account creation
- Firebase email/password signup and login
- Firestore user profile creation
- Protected albums, album detail, profile, and future admin routes
- iCloud Shared Album links
- Mobile-first responsive design

## Deployment

The app is ready for Vercel as a standard Next.js project. Add the same
`NEXT_PUBLIC_FIREBASE_*` values to the Vercel project environment variables
before deploying.
