import type { APIRoute } from 'astro';
import { getActiveSubscribers } from '../../../lib/subscribers.js';
import { sendNewPostNotification, type BlogPost } from '../../../lib/email.js';

export const POST: APIRoute = async ({ request }) => {
    try {
        // Verify webhook (optional but recommended)
        const webhookSecret = process.env.CONTENTFUL_WEBHOOK_SECRET;
        if (webhookSecret) {
            const signature = request.headers.get('X-Contentful-Webhook-Name');
            // Add signature verification logic here
        }
        
        const body = await request.json();
        
        // Check if this is a blog post publication
        if (body.sys?.contentType?.sys?.id !== 'blogPost') {
            return new Response('Not a blog post', { status: 200 });
        }
        
        // Only process published entries
        if (body.sys?.publishedVersion === undefined) {
            return new Response('Not published', { status: 200 });
        }
        
        // Extract post data
        const post: BlogPost = {
            id: body.sys.id,
            title: body.fields.title?.['en-US'] || body.fields.title,
            excerpt: body.fields.excerpt?.['en-US'] || body.fields.excerpt,
            slug: body.fields.slug?.['en-US'] || body.fields.slug,
            publishedDate: body.fields.publishedDate?.['en-US'] || body.fields.publishedDate,
            featuredImage: body.fields.featuredImage?.['en-US']?.fields?.file?.url || 
                          body.fields.featuredImage?.fields?.file?.url
        };
        
        // Get all active subscribers
        const subscribers = await getActiveSubscribers();
        
        // Send notifications (consider using a queue for large subscriber lists)
        const notifications = subscribers.map(email => 
            sendNewPostNotification(email, post).catch(error => {
                console.error(`Failed to send notification to ${email}:`, error);
            })
        );
        
        await Promise.allSettled(notifications);
        
        return new Response(
            JSON.stringify({ 
                message: `Notifications sent to ${subscribers.length} subscribers` 
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
        
    } catch (error) {
        console.error('Webhook error:', error);
        return new Response(
            JSON.stringify({ error: 'Webhook processing failed' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};