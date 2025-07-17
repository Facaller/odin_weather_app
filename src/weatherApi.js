export class apiScript {
    constructor () {
        this.apiKey  = '6SZ6Y2GHCYFLUKC6VLHMLFPDS';
        this.baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
        this.location = 'cape town';
        this.weatherData = {};

        this.fetchData('cape town')
        this.getWeatherData();
    }

    async fetchData (location) {
        try {
            const apiKey  = this.apiKey;
            const baseUrl = this.baseUrl;
            const url     = `${baseUrl}${location}?key=${apiKey}`;
    
            const response = await fetch(url);
            const data     = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    // next steps is to create method to extract data I need and return it as object.
    // Then create smaller methods that pull a specific data point from that object.
    async getWeatherData () {
        const data = await this.fetchData(this.location);
        // Destructure json into data. Destructure data points into CurrentConditions
        // Build new object with empty constructor object
        const { address: location, currentConditions } = data;
        
        const {
            temp,
            feelslike,
            humidity,
            conditions,
            windspeed: wind,
        } = currentConditions;

        this.weatherData = {
            location,
            temp,
            feelslike,
            wind,
            humidity,
            conditions
        };
        console.log(this.weatherData);
        return this.weatherData;
        
    }
}