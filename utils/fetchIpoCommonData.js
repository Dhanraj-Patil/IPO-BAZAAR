import axios from 'axios';

export async function fetchIpoCommonData() {
  try {
    // Fetching data from the first API
    const response = await fetch('http://localhost:3000/api/CommonRoute');
    if (!response.ok) {
      throw new Error('Failed to fetch data from CommonRoute');
    }
    const data = await response.json();
    // console.log(data)

    // Make sure the data structure is correct for the second API request
    const postData = {
      data: Array.isArray(data) ? data : [],
    };

    // Sending data to the second API using axios
    const response2 = await axios.post('http://localhost:3000/api/stock-prices', postData);
    console.log(response2.data.stockPrices);

    return response2.data.stockPrices;  // Returning the data from the first API

  } catch (error) {
    console.error('Error fetching IPO data:', error);
    return [];  // Returning an empty array if there is an error
  }
}