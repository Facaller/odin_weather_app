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
// Event handlers
    async submitInput () {
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
}