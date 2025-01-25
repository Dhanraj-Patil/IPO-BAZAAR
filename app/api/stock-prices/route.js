import yahooFinance from 'yahoo-finance2';

export async function POST(request) {
  try {
    const body = await request.json();
    const { data } = body;

    if (!Array.isArray(data)) {
      return new Response(
        JSON.stringify({ error: 'Invalid input format. Expected an array.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch stock prices for all symbols
    const stockPrices = await Promise.all(
      data.map(async (item) => {
        try {
          if (!item.symbol) {
            return { ...item, price: 'N/A' };
          }
          const quote = await yahooFinance.quote(item.symbol);
          return { 
            ...item, 
            price: quote.regularMarketPrice || 'N/A' 
          };
        } catch {
          return { ...item, price: 'N/A' };
        }
      })
    );

    return new Response(JSON.stringify({ stockPrices }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while fetching stock prices.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}