import { validate } from "webpack";

export class apiScript {
    constructor () {
        this.apiKey  = '6SZ6Y2GHCYFLUKC6VLHMLFPDS';
        this.baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
        this.location = 'helsinki';
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
            const validtion = this.validateData(data);
            if (validtion) {
                console.log(data);
                return data;
            }
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    validateData (data) {
        const validate = data.hasOwnProperty('currentConditions');
        return validate;
    }

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

    getLocation () {
        if (!this.weatherData.location) {
            return 'No data available'
        } else {
            return this.weatherData.location;
        }
    }

    getTemp () {
        if (this.weatherData.temp == null) {
            return 'No data available'
        } else {
            return this.weatherData.temp;
        }
    }

    getFeelsLike () {
        if (this.weatherData.feelslike == null) {
            return 'No data available'
        } else {
            return this.weatherData.feelslike;
        }
    }

    getWind () {
        if (!this.weatherData.wind) {
            return 'No data available'
        } else {
            return this.weatherData.wind;
        }
    }

    getHumidity () {
        if (!this.weatherData.humidity) {
            return 'No data available'
        } else {
            return this.weatherData.humidity;
        }
    }

    getConditions () {
        if (!this.weatherData.conditions) {
            return 'No data available'
        } else {
            return this.weatherData.conditions;
        }
    }
}