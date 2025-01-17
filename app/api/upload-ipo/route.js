import connectToDb from '@/db';
import IpoSchema from '@/IpoSchema';

export async function POST(req, res) {
  await connectToDb();
  console.log('Connected to DB');
  
  try {
    const ipoData = await req.json();
    console.log('IPO Data:', ipoData);
    const ipo = new IpoSchema(ipoData);
    await ipo.save();
    console.log('IPO Saved:', ipo);
    return new Response(JSON.stringify(ipo), { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}