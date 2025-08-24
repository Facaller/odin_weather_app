import { conditionMap } from "./videoMap";

export class imageUtil {
    constructor () {
        this.conditionMap = conditionMap;
    }

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