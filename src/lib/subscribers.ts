// import { Redis } from '@upstash/redis';

// Initialize Redis client
// const redis = new Redis({
//     url: import.meta.env.KV_REST_API_URL,
//     token: import.meta.env.KV_REST_API_TOKEN,
// });

export interface Subscriber {
    email: string;
    subscribedAt: string;
    isActive: boolean;
}

export async function getSubscribers(): Promise<Subscriber[]> {
    // TODO: Uncomment Redis implementation after adding credentials
    // try {
    //     const emails = await redis.smembers('subscribers:active');
    //     const subscribers: Subscriber[] = [];
    //     
    //     for (const email of emails) {
    //         const data = await redis.hgetall(`subscriber:${email}`);
    //         if (data) {
    //             subscribers.push({
    //                 email: email as string,
    //                 subscribedAt: (data.subscribedAt as string) || new Date().toISOString(),
    //                 isActive: (data.isActive as string) !== 'false',
    //             });
    //         }
    //     }
    //     
    //     return subscribers;
    // } catch (error) {
    //     console.error('Error fetching subscribers:', error);
    //     return [];
    // }
    
    console.log('Redis not configured - getSubscribers() returning empty array');
    return [];
}

export async function addSubscriber(email: string): Promise<void> {
    // TODO: Uncomment Redis implementation after adding credentials
    // try {
    //     // Check if already exists
    //     const exists = await redis.sismember('subscribers:active', email);
    //     
    //     if (!exists) {
    //         // Add to active set
    //         await redis.sadd('subscribers:active', email);
    //         
    //         // Store subscriber details
    //         await redis.hset(`subscriber:${email}`, {
    //             email,
    //             subscribedAt: new Date().toISOString(),
    //             isActive: 'true',
    //         });
    //     } else {
    //         // Reactivate if previously unsubscribed
    //         await redis.hset(`subscriber:${email}`, {
    //             isActive: 'true',
    //         });
    //         await redis.sadd('subscribers:active', email);
    //     }
    // } catch (error) {
    //     console.error('Error adding subscriber:', error);
    //     throw error;
    // }
    
    console.log(`Redis not configured - Would add subscriber: ${email}`);
}

export async function removeSubscriber(email: string): Promise<void> {
    // TODO: Uncomment Redis implementation after adding credentials
    // try {
    //     // Remove from active set
    //     await redis.srem('subscribers:active', email);
    //     
    //     // Update status but keep data (for GDPR compliance logging)
    //     await redis.hset(`subscriber:${email}`, {
    //         isActive: 'false',
    //         unsubscribedAt: new Date().toISOString(),
    //     });
    // } catch (error) {
    //     console.error('Error removing subscriber:', error);
    //     throw error;
    // }
    
    console.log(`Redis not configured - Would remove subscriber: ${email}`);
}

export async function getActiveSubscribers(): Promise<string[]> {
    // TODO: Uncomment Redis implementation after adding credentials
    // try {
    //     const emails = await redis.smembers('subscribers:active');
    //     return emails as string[];
    // } catch (error) {
    //     console.error('Error fetching active subscribers:', error);
    //     return [];
    // }
    
    console.log('Redis not configured - getActiveSubscribers() returning empty array');
    return [];
}