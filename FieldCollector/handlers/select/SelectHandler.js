export default class SelectHandler {
    static shouldProcess(htmlElement) {
        return true;
    }

    static process(htmlElement) {
        return {
            "disable": () => htmlElement.disabled = true,
            "enable": () => htmlElement.disabled = false,
            "focus": () => htmlElement.focus(),
            "blur": () => htmlElement.blur(),
            "getSelected": () => htmlElement.value,
            "element": htmlElement,
        };
    }

    static JSONProcess(htmlElement) {
        if (!htmlElement.value) return "";
        return htmlElement.value;
    }
}