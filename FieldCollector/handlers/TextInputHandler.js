export default class TextInputHandler {
    static shouldProcess(htmlElement){
        return htmlElement.type === "text" || !htmlElement.type;
    }

    static process(htmlElement){
        return {
            "get": () => String(htmlElement.value),
            "set": (string) => htmlElement.value = string,
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