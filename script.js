document.addEventListener('DOMContentLoaded', () => {
	// Get the current day (0 = Sunday, 1 = Monday, etc.)
	const currentDay = new Date().getDay();
	// Map JavaScript day index to our data day strings
	const dayMap = {
		0: 'sun',
		1: 'mon',
		2: 'tue',
		3: 'wed',
		4: 'thu',
		5: 'fri',
		6: 'sat'
	};
	const currentDayString = dayMap[currentDay];

	// Fallback data in case fetch fails
	const fallbackData = [
		{
			"day": "mon",
			"amount": 17.45
		},
		{
			"day": "tue",
			"amount": 34.91
		},
		{
			"day": "wed",
			"amount": 52.36
		},
		{
			"day": "thu",
			"amount": 31.07
		},
		{
			"day": "fri",
			"amount": 23.39
		},
		{
			"day": "sat",
			"amount": 43.28
		},
		{
			"day": "sun",
			"amount": 25.48
		}
	];

	// Try to fetch the data from data.json
	try {
		fetch('./data.json')
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				renderChart(data, currentDayString);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
				// Use fallback data if fetch fails
				console.log('Using fallback data instead');
				renderChart(fallbackData, currentDayString);
			});
	} catch (error) {
		console.error('Fetch error:', error);
		// Use fallback data if fetch fails
		console.log('Using fallback data instead');
		renderChart(fallbackData, currentDayString);
	}
});

function renderChart(data, currentDay) {
	const chartContainer = document.getElementById('chart-container');
	chartContainer.innerHTML = '';

	// Find the maximum amount to calculate relative heights
	const maxAmount = Math.max(...data.map(item => item.amount));

	const getHeightInPixels = (amount) => {
		const containerHeight = 150; // Usable height in pixels
		const minHeight = 20; // Minimum height for the smallest bar

		// Calculate height with a slight curve to match the design
		return Math.floor(minHeight + ((amount / maxAmount) * (containerHeight - minHeight)));
	};

	// Create a bar for each day
	data.forEach(dayData => {
		const heightInPixels = getHeightInPixels(dayData.amount);

		const barContainer = document.createElement('div');
		barContainer.className = 'chart-bar-container';

		const bar = document.createElement('div');
		bar.className = 'chart-bar';

		if (dayData.day === currentDay) {
			bar.classList.add('current-day');
		}

		bar.style.height = `${heightInPixels}px`;

		const tooltip = document.createElement('div');
		tooltip.className = 'chart-bar-tooltip';
		tooltip.textContent = `$${dayData.amount}`;

		const label = document.createElement('div');
		label.className = 'chart-bar-label';
		label.textContent = dayData.day;

		bar.appendChild(tooltip);
		barContainer.appendChild(bar);
		barContainer.appendChild(label);
		chartContainer.appendChild(barContainer);
	});
}