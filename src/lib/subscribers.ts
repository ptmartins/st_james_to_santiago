import { promises as fs } from 'fs';
import path from 'path';

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

export interface Subscriber {
    email: string;
    subscribedAt: string;
    isActive: boolean;
}

export async function getSubscribers(): Promise<Subscriber[]> {
    try {
        // Ensure data directory exists
        await fs.mkdir(path.dirname(SUBSCRIBERS_FILE), { recursive: true });
        
        const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function addSubscriber(email: string): Promise<void> {
    const subscribers = await getSubscribers();
    
    // Check if already exists
    const existingIndex = subscribers.findIndex(sub => sub.email === email);
    
    if (existingIndex !== -1) {
        // Reactivate if previously unsubscribed
        subscribers[existingIndex].isActive = true;
    } else {
        // Add new subscriber
        subscribers.push({
            email,
            subscribedAt: new Date().toISOString(),
            isActive: true
        });
    }
    
    await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function removeSubscriber(email: string): Promise<void> {
    const subscribers = await getSubscribers();
    const index = subscribers.findIndex(sub => sub.email === email);
    
    if (index !== -1) {
        subscribers[index].isActive = false;
        await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
    }
}

export async function getActiveSubscribers(): Promise<string[]> {
    const subscribers = await getSubscribers();
    return subscribers
        .filter(sub => sub.isActive)
        .map(sub => sub.email);
}