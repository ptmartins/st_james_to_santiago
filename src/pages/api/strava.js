import { getStravaActivities } from '../../lib/strava';

export async function GET({ request }) {
  try {
    const activities = await getStravaActivities();
    
    return new Response(JSON.stringify(activities), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}