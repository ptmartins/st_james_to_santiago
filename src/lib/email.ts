import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    publishedDate: string;
    featuredImage?: string;
}

export async function sendConfirmationEmail(email: string): Promise<void> {
    const mailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@stjamestosantiago.com',
        to: email,
        subject: 'Welcome to St. James to Santiago Blog!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #007acc;">Welcome to our blog!</h2>
                <p>Thank you for subscribing to updates from St. James to Santiago.</p>
                <p>You'll receive notifications whenever we publish new posts about the Camino de Santiago.</p>
                <hr>
                <p style="font-size: 12px; color: #666;">
                    If you didn't subscribe to this newsletter, you can safely ignore this email.
                </p>
            </div>
        `
    };
    
    await transporter.sendMail(mailOptions);
}

export async function sendNewPostNotification(email: string, post: BlogPost): Promise<void> {
    const mailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@stjamestosantiago.com',
        to: email,
        subject: `New Blog Post: ${post.title}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #007acc;">New Blog Post Published!</h2>
                
                ${post.featuredImage ? `
                    <img src="https:${post.featuredImage}" 
                         alt="${post.title}" 
                         style="width: 100%; max-width: 500px; height: auto; border-radius: 8px; margin: 20px 0;">
                ` : ''}
                
                <h3>${post.title}</h3>
                <p style="color: #666; line-height: 1.6;">${post.excerpt}</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.SITE_URL}/blog/${post.slug}" 
                       style="background: #007acc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Read Full Post
                    </a>
                </div>
                
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #666; text-align: center;">
                    <a href="${process.env.SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}" 
                       style="color: #666;">Unsubscribe</a> from these notifications
                </p>
            </div>
        `
    };
    
    await transporter.sendMail(mailOptions);
}