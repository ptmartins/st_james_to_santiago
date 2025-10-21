import type { APIRoute } from 'astro';

export const prerender = false; // Enable server-side rendering for this endpoint

export const POST: APIRoute = async ({ request }) => {
    try {
        console.log('FROM API - Request received');
        
        // Check if request has a body
        const contentLength = request.headers.get('content-length');
        console.log('Content-Length:', contentLength);
        
        if (!contentLength || contentLength === '0') {
            return new Response(
                JSON.stringify({ error: 'Request body is empty' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
        
        let body;
        try {
            body = await request.json();
            console.log('Parsed body:', body);
        } catch (parseError) {
            console.error('JSON parsing error:', parseError);
            return new Response(
                JSON.stringify({ error: 'Invalid JSON in request body' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
        
        const { email } = body;
        console.log('Email from body:', email);
        
        if (!email || !isValidEmail(email)) {
            return new Response(
                JSON.stringify({ error: 'Valid email is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
        
        // Store subscription
        await storeSubscription(email);
        
        // Send confirmation email
        await sendConfirmationEmail(email);
        
        return new Response(
            JSON.stringify({ message: 'Successfully subscribed!' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
        
    } catch (error) {
        console.error('Subscription error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function storeSubscription(email: string): Promise<void> {
    console.log('Storing subscription for:', email);
    // Simple file storage example (replace with database)
    const fs = await import('fs/promises');
    const path = './subscribers.json';
    
    try {
        let subscribers: string[] = [];
        try {
            const data = await fs.readFile(path, 'utf-8');
            subscribers = JSON.parse(data);
        } catch {
            // File doesn't exist, start with empty array
        }
        
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            await fs.writeFile(path, JSON.stringify(subscribers, null, 2));
            console.log('Subscription stored successfully');
        } else {
            console.log('Email already subscribed');
        }
    } catch (error) {
        console.error('Error storing subscription:', error);
        throw error;
    }
}

async function sendConfirmationEmail(email: string): Promise<void> {
    console.log(`Confirmation email would be sent to: ${email}`);
}