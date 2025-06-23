export default class TextInputHandler {
    static shouldProcess(htmlElement){
        return htmlElement.type === "text" || htmlElement.type === "password" || htmlElement.type === "email" || htmlElement.type === "hidden" || htmlElement.type === "tel" ||!htmlElement.type;
    }

    static process(htmlElement){
        return {
            "getText": () => String(htmlElement.value),
            "setText": (string) => htmlElement.value = string,
            "toBase64": () => btoa(htmlElement.value),
            "toBinary": () => htmlElement.value.split("")
                .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
                .join(" "),
            "clear": () => htmlElement.value = "",
            "focus": () => htmlElement.focus(),
            "blur": () => htmlElement.blur(),
            "isEmpty": () => htmlElement.value.trim() === "",
            "enable": () => htmlElement.disabled = false,
            "disable": () => htmlElement.disabled = true,
            "setPlaceHolder": (text) => htmlElement.placeholder = text,
            "getPlaceHolder": () => htmlElement.placeholder,
            "appendText": (text) => htmlElement.value += text,
            "prependText": (text) => htmlElement.value = text + htmlElement.value,
            "element": htmlElement,
            "onInput": (callback) => htmlElement.addEventListener("input", (event) => {
                callback(event);
            }),
            "onChange": (callback) => htmlElement.addEventListener("change", (event) => {
                callback(event);
            }),
            "onEnter": (callback) =>  htmlElement.addEventListener("keydown", (event) => {
                if (event.key === "Enter") callback(event);
            }),
        };
    }

    static JSONProcess(htmlElement){
        return String(htmlElement.value);
    }
}