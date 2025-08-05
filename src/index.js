import "./styles.css"
import { domHandler } from "./domHandler";
import { apiScript } from "./weatherApi";

document.addEventListener('DOMContentLoaded', () => {
    const api = new apiScript();
    const dom = new domHandler(api);
    dom.submitInput();
    dom.dataToImperial();
    dom.dataToMetric();
});