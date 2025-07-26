export async function initVisitorCounter() {
    try {
        const response = await fetch('/.netlify/functions/visitor-counter');
        if (!response.ok) {
            throw new Error('Failed to fetch count');
        }
        const data = await response.json();

        const countElement = document.getElementById('visitor-count');
        if (countElement) {
            countElement.textContent = data.count.toLocaleString('id-ID');
        }
    } catch (error) {
        console.error("Error fetching visitor count:", error);
        const countElement = document.getElementById('visitor-count');
        if (countElement) {
            countElement.textContent = 'N/A';
        }
    }
}