import { apiScript } from "./weatherApi";

export class domElements {
    constructor () {
        this.input     = document.querySelector('#search');
        this.errorBox  = document.querySelector('.error-box');
        this.errorText = document.querySelector('.error-text');
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

        return inputValue || null;
    }

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

    submitInput = (event) => {
        const inputValue = this.checkInput();
        if (!inputValue) {
            this.showErrorMessage('Please enter a location')
            return
        }
    }
}