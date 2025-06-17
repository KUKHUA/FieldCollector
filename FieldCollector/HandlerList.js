export default class HandlerList {
    #handlerMap = new Map();
    #handledTypes = [];

    getQuerySelector(){
        let queryString = "";
        for(const type of this.#handledTypes){
            queryString += type + ",";
        }

        if(queryString.endsWith(","))
            queryString = queryString.slice(0, -1); //removes the last comma

        return queryString;
    }

    findHandlerFor(htmlElement){
        if(!htmlElement) throw new Error("Invalid elementType: cannot be null or undefined."); 
        const elementType = htmlElement.constructor;
        const acceptableHandlers = this.#handlerMap.get(elementType);

        if (!acceptableHandlers) return null;

        const vaildHandlers = acceptableHandlers.filter(h => h.handler.shouldProcess(htmlElement));
        if(vaildHandlers.length === 0) return null;

        return vaildHandlers[0].handler;
        /*
            the array was presorted in `addHandler`, so 
            index 0 will be the handler with the lowest priority number 
        */
    }

    addHandler(elementType, tagName, handler, priority = 0){
        if(!elementType) throw new Error("Invalid elementType: cannot be null or undefined."); 
        if(priority < 0) throw new Error("Invalid priority: it can not be less than zero.");
        if(!tagName) throw new Error("Invaild tagName: cannot be null or undefined.")
        if(!handler) throw new Error("Invaild handler: cannot be null or undefined.");
        if(typeof handler.shouldProcess !== "function") throw new Error("Invaild handler: shouldProcess should be a function.");
        if(typeof handler.process !== "function") throw new Error("Invaild handler: process should be a function.");
        if(typeof handler.JSONProcess !== "function") throw new Error("Invaild handler: JSONProcess should be a function.");

        let errMsg = "check if its null or an unknown element";

        if(typeof elementType == "string"){
            elementType = document.createElement(elementType).constructor;
            errMsg = "try using the class name for the element instead of a string";
        }

        if(!this.#isElementType(elementType))
            throw new Error("Invalid elementType: " + errMsg);

        if(!this.#handlerMap.has(elementType))
            this.#handlerMap.set(elementType, []);

        const handlerTypeArray = this.#handlerMap.get(elementType);
        handlerTypeArray.push({handler, priority});
        handlerTypeArray.sort((one, two) => one.priority - two.priority); //sort it in ascending order

        this.#handlerMap.set(elementType, handlerTypeArray);
        this.#handledTypes.push(tagName);
    }

    #isElementType(element){
        if(element == null)
            return false;

        if (element instanceof HTMLUnknownElement) 
            return false;

        if(typeof element !== "function") 
            return false;

        if(!HTMLElement.prototype.isPrototypeOf(element.prototype)) 
            return false; //all html elements are a prototype under HTMLElement

        return true;
    }
}