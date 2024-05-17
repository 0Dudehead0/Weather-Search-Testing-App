document.addEventListener('DOMContentLoaded', () => {
    
    const cityNameElement = document.getElementById('location-name');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('weather-description');
    const iconElement = document.getElementById('weather-icon');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    //Insert your own API KEY below.
    const apiKey = 'YOUR_OWN_API_KEY';

    function fetchWeatherData(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found!');
                }
                return response.json();
            })
            .then(data => {
                const cityName = data.name;
                const temperature = Math.round(data.main.temp);
                const weatherDescription = data.weather[0].description;
                const weatherIcon = data.weather[0].icon;

                cityNameElement.textContent = cityName;
                temperatureElement.textContent = `${temperature}°C`;
                descriptionElement.textContent = weatherDescription;
                iconElement.src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
                iconElement.alt = weatherDescription;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                cityNameElement.textContent = 'location not found';
            });
    }

    searchButton.addEventListener('click', () => {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeatherData(city);
            searchInput.value = ''; 
        } else {
            alert('Please enter a location');
        }
    });

    fetchWeatherData('Kuching');
});
