import connectToDb from '@/db';
import IpoSchema from '@/IpoSchema';

export async function GET(req, res) {
  await connectToDb();
  console.log('Connected to DB');
  
  try {
    const ipos = await IpoSchema.find({});
    console.log('Fetched IPOs:', ipos);
    return new Response(JSON.stringify(ipos), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}