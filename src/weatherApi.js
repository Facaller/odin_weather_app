export class apiScript {
    constructor () {
        this.apiKey  = '6SZ6Y2GHCYFLUKC6VLHMLFPDS';
        this.baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    }

    async fetchData (location) {
        const apiKey = this.apiKey;
        const baseUrl = this.baseUrl;
        const url = `${baseUrl}` //add elements together
    }
}