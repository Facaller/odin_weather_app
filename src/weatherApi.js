export class apiScript {
    constructor () {
        this.apiKey  = '6SZ6Y2GHCYFLUKC6VLHMLFPDS';
        this.baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
        this.rawData = {};
        this.unitGroup = 'metric'
        this.processedData = {};
    }

    async fetchData (location, unit) {
        try {
            const apiKey    = this.apiKey;
            const baseUrl   = this.baseUrl;
            const unitGroup = `unitGroup=${unit}`;
            const url       = `${baseUrl}${location}?${unitGroup}&key=${apiKey}`;
    
            const response   = await fetch(url);
            const data       = await response.json();
            const validation = this.validateData(data);
            if (validation) {
                console.log(data);
                this.rawData = data;
                return true;;
            }
        } catch (error) {
            console.log(error)
            return false;
        }
    }
//validation methods
    validateData (data) {
        if (!data) return false;
        
        const isEmptyObject = Object.keys(data).length === 0;
        const objectLocation = 'currentConditions' in data;
        const objectAddress = 'address' in data;
        if (isEmptyObject && !objectLocation && !objectAddress) return false;

        const conditionValidation = this.validateCurrentConditions(data);
        const valueValidation = this.validateValueTypes(data);
        if (!conditionValidation || !valueValidation) return false;
        
        return true;
    }

    validateCurrentConditions (data) {
        if (!this.isPlainObject(data.currentConditions)) return false;

        const keysToCheck = ['conditions', 'feelslike', 'humidity', 'temp', 'windspeed']
        const allKeysExist = keysToCheck.every(key => data.currentConditions.hasOwnProperty(key));

        return allKeysExist;
    }

    validateValueTypes (data) {
        const conditions = data.currentConditions;
        const areValuesValid = Object.values(conditions)
        .every(value => value != null 
                        && value !== ''
                        && value !== '-'
                        && value !== '--'
                        && value !== 'N/A'
                        && value !== 'unknown');
        if (!areValuesValid) return false;

        const tempBool       = this.validateTemp(conditions);
        const humidityBool   = this.validateHumidity(conditions);
        const conditionsBool = this.validateConditions(conditions);
        const feelsLikeBool  = this.validateFeelsLike(conditions);
        const windBool       = this.validateWind(conditions);

        if (!tempBool
            && !humidityBool
            && !conditionsBool
            && !feelsLikeBool
            && !windBool) {
            return false;
        }
        return true;
    }

    validateTemp (data) {
        const tempValue = data.temp;
        if (typeof tempValue !== 'number') {
            return false;
        }
        return true;
    }

    validateHumidity (data) {
        const humidityValue = data.humidity
        if (typeof humidityValue !== 'number' 
            || humidityValue > 100 
            || humidityValue < 0) {
                return false;
        }
        return true;
    }

    validateConditions (data) {
        const conditionsValue = data.conditions;
        if (typeof conditionsValue !== 'string') {
            return false;
        }
        return true;
    }

    validateFeelsLike (data) {
        const feelsLikeValue = data.feelslike;
        if (typeof feelsLikeValue !== 'number') {
            return false;
        }
        return true;
    }

    validateWind (data) {
        const windValue = data.windspeed;
        if (typeof windValue !== 'number') {
            return false;
        }
        return true
    }

    isPlainObject(value) {
        return (
            typeof value === 'object' &&
            value !== null &&
            !Array.isArray(value) &&
            Object.prototype.toString.call(value) === '[object Object]'
        );
    }
//getters
    getWeatherData () {
        const data = this.rawData;
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