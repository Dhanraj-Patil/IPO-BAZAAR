// app/api/updateIpoSubscription/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import connectDB from '@/db';
import Ipo from '@/IpoSchema';

export async function POST(request) {
    // Increase timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes timeout

    try {
        // Connect to database
        await connectDB();

        // Parse incoming request body
        const ipoEntries = await request.json();

        // Store results for response
        const updateResults = [];

        // Process each IPO entry sequentially
        for (const entry of ipoEntries) {
            try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                // Fetch subscription details with timeout
                const subscriptionResponse = await axios.get(
                    `${apiUrl}/scrapSubTable?url=${encodeURIComponent(entry.IPOLink)}`,
                    { 
                        signal: controller.signal,
                        timeout: 30000 // 30 seconds per request
                    }
                );

                // Update IPO document with subscription status
                const updatedIpo = await Ipo.findByIdAndUpdate(
                    entry._id,
                    { 
                        SubscriptionStatus: subscriptionResponse.data,
                        subscriptionFetchedAt: new Date()
                    },
                    { new: true }
                );

                updateResults.push({
                    ipoId: entry._id,
                    ipoName: entry.IPOName,
                    status: 'Success',
                    details: subscriptionResponse.data
                });
            } catch (entryError) {
                console.error(`Error processing IPO ${entry.IPOName}:`, entryError);
                updateResults.push({
                    ipoId: entry._id,
                    ipoName: entry.IPOName,
                    status: 'Failed',
                    error: entryError.message
                });
            }
        }

        clearTimeout(timeoutId);
        return NextResponse.json(updateResults);

    } catch (error) {
        clearTimeout(timeoutId);
        console.error('Update IPO Subscription Error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to update IPO subscriptions',
                details: error.message 
            },
            { status: 500 }
        );
    }
}