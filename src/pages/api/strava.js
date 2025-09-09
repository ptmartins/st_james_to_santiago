import fetch from 'node-fetch';

const STRAVA_CLIENT_ID = import.meta.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = import.meta.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = import.meta.env.STRAVA_REFRESH_TOKEN;

let cachedAccessToken = null;
let cachedExpiresAt = 0;

console.log(STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN);

export async function GET({ request }) {
  try {
    // Refresh access token if expired or not present
    if (!cachedAccessToken || Date.now() / 1000 > cachedExpiresAt) {
      const tokenRes = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json charset=UTF-8' },
        body: JSON.stringify({
          client_id: STRAVA_CLIENT_ID,
          client_secret: STRAVA_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: STRAVA_REFRESH_TOKEN,
        }),
      });
      const tokenData = await tokenRes.json();
      cachedAccessToken = tokenData.access_token;
      cachedExpiresAt = tokenData.expires_at;
    }

    // Fetch latest activities
    const activitiesRes = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=5', {
      headers: { Authorization: `Bearer ${cachedAccessToken}` },
    });
    const activities = await activitiesRes.json();

    return new Response(JSON.stringify(activities), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}