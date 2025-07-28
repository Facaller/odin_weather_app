export class apiScript {
    constructor () {
        this.apiKey  = '6SZ6Y2GHCYFLUKC6VLHMLFPDS';
        this.baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
        this.location = 'helsinki';
        this.rawData = {};
        this.processedData = {};

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
            const validation = this.validateData(data);
            if (validation) {
                console.log(data);
                this.rawData = data;
                return this.rawData;
            }
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    validateData (data) {
        if (!data) return null;
        
        const isEmptyObject = Object.keys(data).length === 0;
        const objectLocation = 'currentConditions' in data;
        const objectAddress = 'address' in data;

        if (!isEmptyObject && objectLocation && objectAddress) {
            return true;
        }
        return false;
    }

    validateConditions (data) {
        if (!this.isPlainObject(data.currentConditions)) return false;

        const keysToCheck = ['conditions', 'feelslike', 'humidity', 'temp', 'windspeed']
        const allKeysExist = keysToCheck.every(key => data.currentConditions.hasOwnProperty(key));

        return allKeysExist;
    }

    validateValueTypes (data) {

    }

    isPlainObject(value) {
        return (
            typeof value === 'object' &&
            value !== null &&
            !Array.isArray(value) &&
            Object.prototype.toString.call(value) === '[object Object]'
        );
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

        this.processedData = {
            location,
            temp,
            feelslike,
            wind,
            humidity,
            conditions
        };
        console.log(this.processedData);
        return this.processedData;
    }

    getLocation () {
        if (!this.processedData.location) {
            return 'No data available'
        } else {
            return this.processedData.location;
        }
    }

    getTemp () {
        if (this.processedData.temp == null) {
            return 'No data available'
        } else {
            return this.processedData.temp;
        }
    }

    getFeelsLike () {
        if (this.processedData.feelslike == null) {
            return 'No data available'
        } else {
            return this.processedData.feelslike;
        }
    }

    getWind () {
        if (!this.processedData.wind) {
            return 'No data available'
        } else {
            return this.processedData.wind;
        }
    }

    getHumidity () {
        if (!this.processedData.humidity) {
            return 'No data available'
        } else {
            return this.processedData.humidity;
        }
    }

    getConditions () {
        if (!this.processedData.conditions) {
            return 'No data available'
        } else {
            return this.processedData.conditions;
        }
    }
}