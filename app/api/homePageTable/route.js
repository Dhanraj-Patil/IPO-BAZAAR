import connectToDb from '@/db';
import IpoSchema from '@/IpoSchema';

export async function GET(req) {
  await connectToDb();
  console.log('Connected to DB');
  
  try {
    const ipoData = await IpoSchema.find({}, 'IPOName IPOType issuePeriod');
    console.log('IPO Data:', ipoData);
    return new Response(JSON.stringify(ipoData), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}