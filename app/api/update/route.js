// app/api/update/route.js
import connectToDb from '@/db';
import IpoSchema from '@/IpoSchema';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDb();

    // Add 'symbol' field and set it to null for all documents
    const result = await IpoSchema.updateMany(
      {}, // Match all documents
      { $set: { symbol: null } } // Add 'symbol' field and set it to null
    );

    return NextResponse.json({
      message: "Successfully added 'symbol' field and set it to null.",
      modifiedCount: result.modifiedCount,
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating documents:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
