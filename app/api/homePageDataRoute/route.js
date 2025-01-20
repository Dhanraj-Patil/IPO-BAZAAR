import connectToDb from '@/db';
import IpoSchema from '@/IpoSchema';

export async function GET(req) {
  await connectToDb();
  console.log('Connected to DB');
  
  try {
    // Include 'symbol' in the projection
    const ipoData = await IpoSchema.find({}, 'IPOName IPOType issuePeriod symbol listingGain');
    console.log('IPO Data:', ipoData);
    return new Response(JSON.stringify(ipoData), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
