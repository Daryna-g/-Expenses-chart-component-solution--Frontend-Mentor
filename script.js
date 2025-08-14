document.addEventListener('DOMContentLoaded', () => {
	// Get the current day (0 = Sunday, 1 = Monday, etc.)
	const currentDay = new Date().getDay();

	const dayMap = {
		0: 'sun',
		1: 'mon',
		2: 'tue',
		3: 'wed',
		4: 'thu',
		5: 'fri',
		6: 'sat',
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