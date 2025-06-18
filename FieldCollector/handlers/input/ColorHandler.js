export default class ColorHandler {
    static shouldProcess(htmlElement) {
        return htmlElement.type === "color";
    }

    static process(htmlElement) {
        return {
            "disable": () => htmlElement.disabled = true,
            "enable": () => htmlElement.disabled = false,
            "focus": () => htmlElement.focus(),
            "blur": () => htmlElement.blur(),
            "getColor": () => htmlElement.value,
            "setColor": (color) => color = htmlElement.value,
            "toRGB": () => {
                const bigInt = parseInt(htmlElement.value.slice(1),16);
                return {r: (bigInt >> 16) & 255, g: (bigInt >> 8) & 255, b: bigInt & 255}
            },
            "randomColor": () => htmlElement.value = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),

            "onChange": (callback) => htmlElement.addEventListener("change", (event) => {
                callback(event);
            }),
            "onInput": (callback) => htmlElement.addEventListener("input", (event) => {
                callback(event);
            }),
            "element": htmlElement,
        };
    }

    static JSONProcess(htmlElement) {
        return htmlElement.value;
    }
}