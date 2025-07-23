import { apiScript } from "./weatherApi";

export class domElements {
    constructor () {
        this.input = document.querySelector('#search');
        this.error = document.querySelector('.error-text');
    }
}

export class domHandler {
    constructor (weatherAPI) {
        this.weatherAPI = weatherAPI;
        this.elements   = new domElements();

    }

    checkInput () {
        const input = this.elements.input;
        const inputValue = input.value.trim();
//need to check if input is a valid location
        if (!inputValue) {
            console.log('Input error');
            this.showErrorMessage();
            return null
        } else {
            this.removeErrorMessage();
            return inputValue;
        }
    }

    submitInput () {

    }

    showErrorMessage () {
        const error = this.elements.error;
        if (error.classList.contains('hidden')) {
            error.classList.remove('hidden');
            console.log('show error method');
        }
    }

    removeErrorMessage () {
        const error = this.elements.error;
        if (!error.classList.contains('hidden')) {
            error.classList.add('hidden');
            console.log('remove error method');
        }
    }
}