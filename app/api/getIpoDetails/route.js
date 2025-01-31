import { NextResponse } from 'next/server';
import connectToDb from '@/db';
import IpoSchema from '@/IpoSchema';

export async function GET(request) {
  try {
    await connectToDb();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'IPO ID is required' }, { status: 400 });
    }

    // Find the IPO and increment the visits count
    const ipoDetails = await IpoSchema.findByIdAndUpdate(
      id,
      { $inc: { visits: 1 } }, // Increment visits by 1
      { new: true } // Return the updated document
    );

    if (!ipoDetails) {
      return NextResponse.json({ error: 'IPO not found' }, { status: 404 });
    }

    return NextResponse.json(ipoDetails);
  } catch (error) {
    console.error('IPO Details Fetch Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
