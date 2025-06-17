export default class PasswordInputHandler {
    static shouldProcess(htmlElement){
        return htmlElement.type === "password";
    }

    static process(htmlElement){
        return {
            "get": () => String(htmlElement.value),
            "set": (string) => htmlElement.value = string,
            "base64": () => btoa(htmlElement.value),
            "binary": () => htmlElement.value.split("")
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
            "append": (text) => htmlElement.value += text,
            "prepend": (text) => htmlElement.value = text + htmlElement.value,
            "select": () => htmlElement.select(),
            "string": String(htmlElement.value),
            "element": htmlElement,
            
            "onChange": (callback) => htmlElement.addEventListener("input", (event) => {
                callback(event.target.value);
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