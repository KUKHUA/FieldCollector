export default class TimeHandler {
    static shouldProcess(htmlElement) {
        return htmlElement.type === "time";
    }

    static process(htmlElement) {
        return {
            "disable": () => htmlElement.disabled = true,
            "enable": () => htmlElement.disabled = false,
            "focus": () => htmlElement.focus(),
            "blur": () => htmlElement.blur(),
            "setTime": (time) => htmlElement.value = time,
            "getTime": () => htmlElement.value,
            "setMinimumTime": (time) => htmlElement.min = time, 
            "setMaximumTime": (time) => htmlElement.max = time,
            "element": htmlElement,
        };
    }

    static JSONProcess(htmlElement) {
        if (!htmlElement.value) return "";
        return htmlElement.value;
    }
}