

export async function fetchBasicIpoData() {
  try {
    const response = await fetch('http://localhost:3000/api/CommonRoute');
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