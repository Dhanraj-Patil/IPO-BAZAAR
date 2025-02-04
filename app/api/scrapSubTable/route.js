import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import prisma from '../../../lib/prisma';

export async function GET(request) {
    try {
        // Get URL and ID from the search params
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');
        const ipoId = searchParams.get('id');

        if (!url) {
            return NextResponse.json(
                { error: 'URL parameter is required' },
                { status: 400 }
            );
        }

        if (!ipoId) {
            return NextResponse.json(
                { error: 'ID parameter is required' },
                { status: 400 }
            );
        }

        // Make the request to the target URL
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        // Parse the HTML
        const $ = cheerio.load(response.data);
        const lastTable = $('table').last();
        
        if (!lastTable.length) {
            return NextResponse.json(
                { error: 'No table found on the page' },
                { status: 404 }
            );
        }

        // Extract headers
        const headers = [];
        lastTable.find('th').each((i, elem) => {
            headers.push($(elem).text().trim());
        });

        // Extract data
        const data = [];
        lastTable.find('tbody tr').each((i, row) => {
            const rowData = {};
            $(row).find('td').each((j, cell) => {
                let value = $(cell).text().trim();
                if (headers[j].includes('lakhs') || headers[j].includes('times')) {
                    value = parseFloat(value.replace('x', ''));
                }
                rowData[headers[j]] = value;
            });
            data.push(rowData);
        });

        // Update the database with the scraped data
        // try {
        //     // Use upsert to create or update the record
        //     await prisma.ipoSubscriptionData.upsert({
        //         where: {
        //             ipoId: parseInt(ipoId)
        //         },
        //         update: {
        //             subscriptionData: data,
        //             lastUpdated: new Date(),
        //         },
        //         create: {
        //             ipoId: parseInt(ipoId),
        //             subscriptionData: data,
        //             lastUpdated: new Date(),
        //         }
        //     });

        //     // Return both the scraped data and a success message
        //     return NextResponse.json({
        //         message: 'Data successfully updated in database',
        //         data: data
        //     });

        // } catch (dbError) {
        //     console.error('Database error:', dbError);
        //     return NextResponse.json(
        //         { 
        //             error: 'Failed to update database',
        //             details: dbError.message 
        //         },
        //         { status: 500 }
        //     );
        // }

    } catch (error) {
        console.error('Scraping error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to scrape data',
                details: error.message 
            },
            { status: 500 }
        );
    }
}