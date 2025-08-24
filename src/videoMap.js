import clear1 from './assets/minecraft_backgrounds/clear1.mp4';
import clear2 from './assets/minecraft_backgrounds/clear2.mp4';
import clear3 from './assets/minecraft_backgrounds/clear3.mp4';
import clear4 from './assets/minecraft_backgrounds/clear4.mp4';

import cloudy1 from './assets/minecraft_backgrounds/cloudy1.mp4';
import cloudy2 from './assets/minecraft_backgrounds/cloudy2.mp4';
import cloudy3 from './assets/minecraft_backgrounds/cloudy3.mp4';
import cloudy4 from './assets/minecraft_backgrounds/cloudy4.mp4';
import cloudy5 from './assets/minecraft_backgrounds/cloudy5.mp4';

import fog1 from './assets/minecraft_backgrounds/fog1.mp4';
import fog2 from './assets/minecraft_backgrounds/fog2.mp4';

import rain1 from './assets/minecraft_backgrounds/rain1.mp4';
import rain2 from './assets/minecraft_backgrounds/rain2.mp4';
import rain3 from './assets/minecraft_backgrounds/rain3.mp4';

import snow1 from './assets/minecraft_backgrounds/snow1.mp4';
import snow2 from './assets/minecraft_backgrounds/snow2.mp4';

import storm1 from './assets/minecraft_backgrounds/storm1.mp4';
import storm2 from './assets/minecraft_backgrounds/storm2.mp4';

import default1 from './assets/minecraft_backgrounds/default1.mp4';

//Not pretty, I know, but didn't think it was worth it to change my fetch method
//and data processing logic to account for the number_type values of the weather conditions
// (which would need to be mapped anew + in the UI)
// So, this is a quick and dirty solution.

export const conditionMap = {
    clear: {
        keywords: ['clear', 'sky unchanged'],
        videos: [clear1, clear2, clear3, clear4]
    },
    cloudy: {
        keywords: ['overcast', 'partially cloudy', 'sky coverage decreasing', 'sky coverage increasing'],
        videos: [cloudy1, cloudy2, cloudy3, cloudy4, cloudy5]
    },
    fog: {
        keywords: ['fog', 'freezing fog', 'mist', 'smoke or haze'],
        videos: [fog1, fog2]
    },
    rain: {
        keywords: ['drizzle', 'heavy drizzle', 'light drizzle', 'heavy drizzle/rain', 'light drizzle/rain', 'rain', 'rain showers', 'heavy rain', 'light rain', 'freezing drizzle/freezing rain', 'heavy freezing drizzle/freezing rain', 'light freezing drizzle/freezing rain', 'heavy freezing rain', 'light freezing rain', 'hail showers', 'hail', 'dust storm', 'precipitation in vicinity'],
        videos: [rain1, rain2,rain3]
    },
    snow: {
        keywords: ['blowing or drifting snow', 'ice', 'heavy rain and snow', 'light rain and snow', 'snow', 'snow and rain showers', 'snow showers', 'heavy snow', 'light snow', 'diamond dust'],
        videos: [snow1, snow2]
    },
    storm: {
        keywords: ['funnel cloud/tornado', 'squalls', 'thunderstorm', 'thunderstorm without precipitation', 'lightning without thunder'],
        videos: [storm1, storm2]
    },
    default: {
        keywords: [],
        videos: [default1]
    }
};