export async function fetchBasicIpoData() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/CommonRoute`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from CommonRoute');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching basic IPO data:', error);
    return [];
  }
}
