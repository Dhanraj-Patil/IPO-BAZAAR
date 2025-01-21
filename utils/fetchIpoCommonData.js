// app/utils/fetchIpoCommonData.js
export async function fetchIpoCommonData() {
    try {
      const response = await fetch('http://localhost:3000/api/CommonRoute');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching IPO data:', error);
      return [];
    }
  }