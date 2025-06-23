export default class NumberHandler {
    static shouldProcess(htmlElement) {
        return htmlElement.type === "number";
    }

    static process(htmlElement) {
        return {
            "disable": () => htmlElement.disabled = true,
            "enable": () => htmlElement.disabled = false,
            "focus": () => htmlElement.focus(),
            "blur": () => htmlElement.blur(),
            "setNumber": (number) => htmlElement.value = number,
            "getNumber": () => htmlElement.value,
            "setMinimumNumber": (number) => htmlElement.min = number, 
            "setMaximumNumber": (number) => htmlElement.max = number,
            "setStep": (step) => htmlElement.step = step,
            "getStep": () => htmlElement.step,
            "element": htmlElement,
        };
    }

    static JSONProcess(htmlElement) {
        if (!htmlElement.value) return "";
        return parseInt(htmlElement.value);
    }
}