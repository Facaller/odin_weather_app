export class domElements {
    constructor () {
        this.errorBox  = document.querySelector('.error-box');
        this.errorText = document.querySelector('.error-text');
        this.input     = document.querySelector('#search');        
        this.form      = document.querySelector('#searchForm');
        this.metric    = document.querySelector('#metricBtn');
        this.imperial  = document.querySelector('#imperialBtn');
        this.tempUnit  = document.querySelectorAll('.unit');
        this.triggers  = [this.metric, this.imperial];
        
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
        this.weatherAPI   = weatherAPI;
        this.elements     = new domElements();
        this.weatherData  = {};
        this.lastLocation = '';
        this.unitGroup    = 'metric';

        this.setUnitButtonState();
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

        this.lastLocation = userInput;
        this.removeErrorMessage();

        const callAPI = await this.secureFetch(
            this.elements.triggers,
            () => this.weatherAPI.fetchData(this.lastLocation, this.unitGroup)
        );
        if (!callAPI) return;

        this.weatherData = this.weatherAPI.getWeatherData();
        this.populateElements();
        this.updateElementUnits(this.unitGroup);
    }

    async toggleUnitGroup () {
        const callAPI = await this.secureFetch(
            this.elements.triggers,
            () => this.weatherAPI.fetchData(this.lastLocation, this.unitGroup)
        );
        if (!callAPI) return;
        
        this.weatherData = this.weatherAPI.getWeatherData();
        this.populateElements();
        this.updateElementUnits(this.unitGroup);
    }

    setDisableElements (elements, bool) {
        elements.forEach(element => {
            element.disabled = bool
        });
    }

    async secureFetch (elements, asyncFetch) {
        this.setDisableElements(elements, true);
        const result = await asyncFetch();
        this.setDisableElements(elements, false);

        return result;
    }

    setUnitButtonState (location) {
        const metric   = this.elements.metric;
        const imperial = this.elements.imperial;

        if (!location || location === '') {
            metric.disabled = true;
            imperial.disabled = true;
        } else {
            metric.disabled = false;
            imperial.disabled = false;
        }
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

    dataToMetric = () => {
        const metric = this.elements.metric;
        metric.addEventListener('click', async (event) => {
            event.preventDefault();
            this.unitGroup = 'metric';
            this.toggleUnitButtons(this.unitGroup);
            await this.toggleUnitGroup();
        });
    }

    dataToImperial = () => {
        const imperial = this.elements.imperial;
        imperial.addEventListener('click', async (event) => {
            event.preventDefault();
            this.unitGroup = 'us';
            this.toggleUnitButtons(this.unitGroup);
            await this.toggleUnitGroup();
        })
    }

    toggleUnitButtons (unitGroupBtn) {
        const metric   = this.elements.metric;
        const imperial = this.elements.imperial;

        if (unitGroupBtn === 'metric') {
            metric.classList.add('active');
            imperial.classList.remove('active');
        } else {
            imperial.classList.add('active');
            metric.classList.remove('active');
        }
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

    updateElementUnits (unitGroup) {
        const tempUnit    = this.elements.tempUnit;
        const windVal     = this.elements.windValue;
        const humidityVal = this.elements.humidityValue;

        if (unitGroup === 'metric') {
            tempUnit.forEach(unit => {
                unit.textContent = ' \u00B0C';
            });
            windVal.textContent =`${windVal.textContent} km`;
        } else {
            tempUnit.forEach(unit => {
                unit.textContent = ' \u00B0F';
            });
            windVal.textContent =`${windVal.textContent} mi`;
        }
        humidityVal.textContent = `${humidityVal.textContent}%`    
    }

    populateElements () {
        const data = this.weatherData;
        if (!this.weatherAPI.isPlainObject(data)) return false;

        const tempVal       = this.elements.tempValue;
        const conditionsVal = this.elements.conditionsValue;
        const locationVal   = this.elements.locationValue;
        const feelsLikeVal  = this.elements.feelsLikeValue;
        const windVal       = this.elements.windValue;
        const humidityVal   = this.elements.humidityValue;

        this.updateElement(tempVal, data.temp);
        this.updateElement(conditionsVal, data.conditions);
        this.updateElement(locationVal, data.location);
        this.updateElement(feelsLikeVal, data.feelslike);
        this.updateElement(windVal, data.wind);
        this.updateElement(humidityVal, data.humidity);
    }
}