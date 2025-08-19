export class imageUtil {
    constructor () {
        this.conditionMap = {
            clear: {
                keywords: ['clear', 'sky unchanged'],
                videos: ['./clear1.mp4', './clear2.mp4']
            },
            cloudy: {
                keywords: ['overcast', 'partially cloudy', 'sky coverage decreasing', 'sky coverage increasing'],
                videos: ['./cloudy1.mp4', './cloudy2.mp4', './cloudy3.mp4']
            },
            fog: {
                keywords: ['fog', 'freezing fog', 'mist', 'smoke or haze'],
                videos: ['./fog1.mp4']
            },
            rain: {
                keywords: ['drizzle', 'heavy drizzle', 'light drizzle', 'heavy drizzle/rain', 'light drizzle/rain', 'rain', 'rain showers', 'heavy rain', 'light rain', 'freezing drizzle/freezing rain', 'heavy freezing drizzle/freezing rain', 'light freezing drizzle/freezing rain', 'heavy freezing rain', 'light freezing rain', 'hail showers', 'hail', 'dust storm', 'precipitation in vicinity'],
                videos: ['./rain1.mp4', './rain2.mp4', './rain3.mp4']
            },
            snow: {
                keywords: ['blowing or drifting snow', 'ice', 'heavy rain and snow', 'light rain and snow', 'snow', 'snow and rain showers', 'snow showers', 'heavy snow', 'light snow', 'diamond dust'],
                videos: ['./snow1.mp4', './snow2.mp4']
            },
            storm: {
                keywords: ['funnel cloud/tornado', 'squalls', 'thunderstorm', 'thunderstorm without precipitation', 'lightning without thunder'],
                videos: ['./storm1.mp4']
            },
        }
    }
//Not pretty, I know, but didn't think it was worth it to change my fetch method
//and data processing logic to account for the number_type values
// (which would need to be mapped anew + in the UI)
// So, this is a quick and dirty solution.
    matchCondition(conditionString) {
        const condition = conditionString.toLowerCase();
        for (const [type, data] of Object.entries(this.conditionMap)) {
            if (data.keywords.some(keyword => condition.includes(keyword))) {
                return type;
            }
        }
        return 'default';
    }

    getRandomVideo (conditionType) {
        if (conditionType) {
            const videoArray = this.conditionMap[conditionType].videos;
            const randomIndex = Math.floor(Math.random() * videoArray.length);
            return videoArray[randomIndex];
        }
    }
}