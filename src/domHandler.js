import { apiScript } from "./weatherApi";

export class domElements {
    constructor () {
        this.input     = document.querySelector('#search');
        this.errorBox  = document.querySelector('.error-box');
        this.errorText = document.querySelector('.error-text');
        
        this.tempValue       = document.getElementById('tempValue');
        this.conditionsValue = document.getElementById('conditionsValue');
        this.locationValue   = document.getElementById('locationValue');
        this.feelsLikeValue  = document.getElementById('feelsLikeValue');
        this.windValue       = document.getElementById('windValue');
        this.humidityValue   = document.getElementById('humidityValue');
    }
}

export class domHandler {
    constructor (weatherAPI) {
        this.weatherAPI  = weatherAPI;
        this.elements    = new domElements();
        this.weatherData = {};
    }

    checkInput () {
        const input = this.elements.input;
        const inputValue = input.value.trim();

        return inputValue || null;
    }

    async processInput () {
        const userInput = this.checkInput();
        if (!userInput) {
            this.showErrorMessage('Please enter a location')
            return
        }
        this.removeErrorMessage();

        const callAPI = await this.weatherAPI.fetchData(userInput);
        if (!callAPI) return;

        const setWeatherData = this.weatherAPI.getWeatherData();
        this.weatherData = setWeatherData;
        this.populateElements();
    }

// Event handlers

    submitInput = () => {
        const input = this.elements.input;
        input.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                await this.processInput();   
            }
        });
    }

// UI rendering methods

    showErrorMessage (message) {
        const errorText = this.elements.errorText;
        const errorBox  = this.elements.errorBox;

        errorText.textContent = message;
        errorBox.classList.remove('hidden');
    }

    removeErrorMessage () {
        const errorText = this.elements.errorText;
        const errorBox  = this.elements.errorBox;

        errorText.textContent = '';
        errorBox.classList.add('hidden');
    }

    updateElement (element, newValue) {
        if (element) {
        element.textContent = newValue ?? 'N/A'
        }
    }

    populateElements () {
        const data = this.weatherData;
        if (!this.weatherAPI.isPlainObject(data)) return false;

        const tempVal       = this.elements.tempValue
        const conditionsVal = this.elements.conditionsValue
        const locationVal   = this.elements.locationValue
        const feelsLikeVal  = this.elements.feelsLikeValue
        const windVal       = this.elements.windValue
        const humidityVal   = this.elements.humidityValue

        this.updateElement(tempVal, data.temp);
        this.updateElement(conditionsVal, data.conditions);
        this.updateElement(locationVal, data.location);
        this.updateElement(feelsLikeVal, data.feelslike);
        this.updateElement(windVal, data.wind);
        this.updateElement(humidityVal, data.humidity);
    }
}