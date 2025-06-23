export default class RadioHandler {
    static shouldProcess(htmlElement) {
        return htmlElement.type === "radio";
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

    static customKey(htmlElement){
        return htmlElement.name;
    }

    static JSONProcess(htmlElement) {
        if(!htmlElement.checked){
            return;
        } else {
            return htmlElement.value;
        }
    }
}