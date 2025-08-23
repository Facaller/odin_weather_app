export class apiScript {
    constructor () {
        this.apiKey  = '6SZ6Y2GHCYFLUKC6VLHMLFPDS';
        this.baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
        this.rawData = {};
        this.processedData = {};
    }

    async fetchData (location, unit) {
        let response;
        try {
            const apiKey    = this.apiKey;
            const baseUrl   = this.baseUrl;
            const unitGroup = `unitGroup=${unit}`;
            const url       = `${baseUrl}${location}?${unitGroup}&key=${apiKey}`;
    
            response  = await fetch(url);
            if (!response.ok) {
                return { success: false, status: response.status }
            }
            const data       = await response.json();
            const validation = this.validateData(data);
            
            if (validation) {
                this.rawData = data;
                return true;;
            } else {
                return { success: false, status: response.status }
            }
        } catch (error) {
            return {
                success: false,
                status: response?.status ?? 'NETWORK_ERROR'
            };
        }
    }
//validation methods
    validateData (data) {
        if (!data) return false;
        
        const isEmptyObject    = Object.keys(data).length === 0;
        const objectConditions = 'currentConditions' in data;
        const objectAddress    = 'resolvedAddress' in data;
        if (isEmptyObject && !objectConditions && !objectAddress) return false;

        const conditionValidation = this.validateCurrentConditions(data);
        const valueValidation     = this.validateValueTypes(data);
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
        .every(value => value !== ''
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
        const { resolvedAddress: location, currentConditions } = data;
        
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
        return this.processedData;
    }
}