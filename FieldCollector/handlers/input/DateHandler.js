export default class DateHandler {
    static shouldProcess(htmlElement) {
        return htmlElement.type === "date";
    }

    static process(htmlElement) {
        return {
            "disable": () => htmlElement.disabled = true,
            "enable": () => htmlElement.disabled = false,
            "focus": () => htmlElement.focus(),
            "blur": () => htmlElement.blur(),
            "setDate": (date) => htmlElement.value = date,
            "getDate": () => htmlElement.value,
            "setMinimumDate": (date) => htmlElement.min = date, 
            "getMinimumDate": () => htmlElement.min,
            "setMaximumDate": (date) => htmlElement.max = date,
            "setStep": (step) => htmlElement.step = step,
            "getStep": () => htmlElement.step,
            "toISO": () => new Date(htmlElement.valueAsNumber).toISOString(),
            "toUnix": () => Math.floor(htmlElement.valueAsNumber / 1000),
            "toHuman": () => new Date(htmlElement.valueAsNumber).toString(),
            "element": htmlElement,
        };
    }

    static JSONProcess(htmlElement) {
        if (!htmlElement.value) return "";
        let date;
        try {
            date = new Date(htmlElement.valueAsNumber).toISOString();
        } catch (error) {
            return "";
        }

        return date;
    }
}