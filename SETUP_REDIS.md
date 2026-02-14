# Upstash Redis Setup Instructions

## Local Development

1. Update `.env` with your credentials from Vercel or Upstash
2. Restart your dev server

## Vercel Production

1. Go to: https://vercel.com/your-username/st-james-to-santiago/settings/environment-variables
2. Add these environment variables:
    - `KV_REST_API_URL` = your_upstash_url
    - `KV_REST_API_TOKEN` = your_token
3. Redeploy your project

## Data Structure in Redis

```
Key: subscribers:active (SET)
└── Contains: ["email1@example.com", "email2@example.com"]

Key: subscriber:email@example.com (HASH)
└── {
      email: "email@example.com",
      subscribedAt: "2026-02-13T10:30:00.000Z",
      isActive: "true"
    }
```

## Migration from JSON (Optional)

If you have existing subscribers in `subscribers.json`, run this migration:

```typescript
// scripts/migrate-to-redis.ts
import { addSubscriber } from "./src/lib/subscribers";
import { readFileSync } from "fs";

const oldSubscribers = JSON.parse(readFileSync("./subscribers.json", "utf-8"));

for (const email of oldSubscribers) {
    await addSubscriber(email);
    console.log(`Migrated: ${email}`);
}
```

## Testing

Test the subscription form at:

- http://localhost:4321/blog (local)
- https://your-site.vercel.app/blog (production)

Check Redis data using Upstash console or CLI.
