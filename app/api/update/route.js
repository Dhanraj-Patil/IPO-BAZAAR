// app/api/update/route.js
import connectToDb from '@/db';
import IpoSchema from '@/IpoSchema';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDb();

    // Add 'symbol' and 'visits' fields, setting 'symbol' to null and 'visits' to 0 for all documents
    const result = await IpoSchema.updateMany(
      {}, // Match all documents
      { $set: { symbol: null, visits: 0 } } // Add fields and set default values
    );

    return NextResponse.json({
      message: "Successfully added 'symbol' field (null) and 'visits' field (0).",
      modifiedCount: result.modifiedCount,
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating documents:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
