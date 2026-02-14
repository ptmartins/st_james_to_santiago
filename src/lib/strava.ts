let cachedAccessToken: string | null = null;
let cachedExpiresAt: number = 0;

export async function getStravaActivities() {
  const STRAVA_CLIENT_ID = import.meta.env.STRAVA_CLIENT_ID;
  const STRAVA_CLIENT_SECRET = import.meta.env.STRAVA_CLIENT_SECRET;
  const STRAVA_REFRESH_TOKEN = import.meta.env.STRAVA_REFRESH_TOKEN;

  try {
    // Refresh access token if expired or not present
    if (!cachedAccessToken || Date.now() / 1000 > cachedExpiresAt) {
      console.log('Refreshing Strava access token...');
      
      const tokenRes = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: STRAVA_CLIENT_ID,
          client_secret: STRAVA_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: STRAVA_REFRESH_TOKEN,
        }),
      });
      
      if (!tokenRes.ok) {
        throw new Error(`Token refresh failed: ${tokenRes.status}`);
      }
      
      const tokenData = await tokenRes.json();
      cachedAccessToken = tokenData.access_token;
      cachedExpiresAt = tokenData.expires_at;
      console.log('Access token refreshed successfully');
    }

    // Fetch latest activities
    console.log('Fetching Strava activities...');
    const activitiesRes = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?per_page=20',
      {
        headers: { Authorization: `Bearer ${cachedAccessToken}` },
      }
    );

    if (!activitiesRes.ok) {
      throw new Error(`Failed to fetch activities: ${activitiesRes.status}`);
    }

    const activities = await activitiesRes.json();
    console.log(`Fetched ${activities.length} activities from Strava`);
    
    return activities;
  } catch (error) {
    console.error('Error fetching Strava activities:', error);
    throw error;
  }
}
