export class HandlerList {
    #handlerMap = new Map();

    addHandler(elementType, handler, priority = 0){
        if(elementType == null) throw new Error("Invalid elementType: cannot be null or undefined.") 
        if(priority < 0) throw new Error("Invalid priority: it can not be less than zero.");

        let errMsg = "check if its null or an unknown element";

        if(typeof elementType == "string"){
            elementType = document.createElement(elementType).constructor;
            errMsg = "try using the class name for the element instead of a string";
        }

        if(!this.#isElementType(elementType))
            throw new Error("Invalid elementType: " + errMsg);

        //TODO: check if the handler has all the required funcitons.

        if(!this.#handlerMap.has(elementType))
            this.#handlerMap.set(elementType, []);

        const handlerTypeArray = this.#handlerMap.get(elementType);
        handlerTypeArray.push({handler, priority});
        handlerTypeArray.sort((one, two) => one.priority - two.priority); //sort it in ascending order

        this.#handlerMap.set(elementType, handlerTypeArray);
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