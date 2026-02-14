import type { APIRoute } from 'astro';
import { addSubscriber } from '../../lib/subscribers';

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
        
        // Store subscription using Redis
        await addSubscriber(email);
        
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

async function sendConfirmationEmail(email: string): Promise<void> {
    console.log(`Confirmation email would be sent to: ${email}`);
    // TODO: Integrate email service (Resend, SendGrid, etc.)
}