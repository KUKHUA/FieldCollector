export default class ButtonInputHandler {
    static shouldProcess(htmlElement) {
        return htmlElement.type === "submit" || htmlElement.type === "reset" || htmlElement.type === "button" || htmlElement.type === "image";
    }

    static process(htmlElement) {
        return {
            "click": () => htmlElement.click(),
            "disable": () => htmlElement.disabled = true,
            "enable": () => htmlElement.disabled = false,
            "focus": () => htmlElement.focus(),
            "blur": () => htmlElement.blur(),
            "setText": (val) => htmlElement.value = val,
            "getText": () => htmlElement.value,
            "element": htmlElement,
            "onClick": (callback) => htmlElement.addEventListener("click", (event) => {
                callback(event);
            }),
        };
    }

    static JSONProcess(htmlElement) {
        return htmlElement.value;
    }
}