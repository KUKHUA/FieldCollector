export default class CheckBoxHandler {
    static shouldProcess(htmlElement) {
        return htmlElement.type === "checkbox";
    }

    static process(htmlElement) {
        return {
            "disable": () => htmlElement.disabled = true,
            "enable": () => htmlElement.disabled = false,
            "focus": () => htmlElement.focus(),
            "blur": () => htmlElement.blur(),
            "isChecked": () => htmlElement.checked,
            "toggleChecked": () => htmlElement.checked = !htmlElement.checked,
            "setChecked": () => htmlElement.checked = true,
            "setUnchecked": () => htmlElement.checked = false,
            "onChange": (callback) => htmlElement.addEventListener("change", (event) => {
                callback(event);
            }),
            "element": htmlElement,
        };
    }

    static JSONProcess(htmlElement) {
        return htmlElement.checked;
    }
}