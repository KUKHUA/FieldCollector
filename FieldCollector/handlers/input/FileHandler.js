export default class FileHandler {
    static shouldProcess(htmlElement) {
        return htmlElement.type === "file";
    }

    static process(htmlElement) {
        return {
            "disable": () => htmlElement.disabled = true,
            "enable": () => htmlElement.disabled = false,
            "focus": () => htmlElement.focus(),
            "blur": () => htmlElement.blur(),
            "onChange": (callback) => htmlElement.addEventListener("change", (event) => {
                callback(event);
            }),
            "hasFiles": () => htmlElement.files.length > 0,
            "hasMultipleFiles": () => htmlElement.files.length >= 1,
            "getFile": (index = 0) => htmlElement.files[index],
        };
    }

    static JSONProcess(htmlElement) {
        if(!htmlElement.files || !htmlElement.files[0]) return "";
        let result = [];

        Array.from(htmlElement.files).forEach((file, index) => {
            result.push({"name": file.name, "size": file.size, "type": file.type, "lastModified": file.lastModified});
        });

        return result;
    }
}