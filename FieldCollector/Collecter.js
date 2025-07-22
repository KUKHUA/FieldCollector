import HandlerList from "./HandlerList.js";
import * as handlers from "./handlers/index.js";

export { HandlerList };
export default class Collector {
    #handlerList;

    constructor(handlerList){
        if(handlerList == null)
            handlerList = this.#getDefaultHanderList();

        this.#handlerList = handlerList;
    }

    #getDefaultHanderList(){
        const defualtList = new HandlerList();
        defualtList.addHandler(HTMLInputElement, `input[type="text"], input[type="password"], input[type="email"], input[type="hidden"], input[type="tel"], div`, handlers.TextHandler);
        // i put div in here so inputs inside divs are serliazed.

        defualtList.addHandler(HTMLInputElement, `input[type="checkbox"]`, handlers.CheckBoxHandler);

        defualtList.addHandler(HTMLInputElement, `input[type="color"]`, handlers.ColorHandler);

        defualtList.addHandler(HTMLInputElement, `input[type="date"]`, handlers.DateHandler);

        defualtList.addHandler(HTMLInputElement, `input[type="datetime-local"]`, handlers.DateTimeHandler);

        defualtList.addHandler(HTMLInputElement, `input[type="file"]`, handlers.FileHandler);
        
        defualtList.addHandler(HTMLInputElement, `input[type="number"]`, handlers.NumberHandler);

        defualtList.addHandler(HTMLInputElement, `input[type="radio"]`, handlers.RadioHandler);

        defualtList.addHandler(HTMLInputElement, `input[type="range"]`, handlers.RangeHandler);

        defualtList.addHandler(HTMLInputElement, `input[type="time"]`, handlers.TimeHandler);

        defualtList.addHandler(HTMLSelectElement , `select`, handlers.SelectHandler);


        return defualtList;
    }

    search(htmlElement, onlyHandled = false){
        if(typeof htmlElement === 'string')
            htmlElement = document.getElementById(htmlElement);

        let objectResult = {}

        const allElements = htmlElement.querySelectorAll("*");
        console.log(allElements);

        for(const element of allElements){
            const theHandler = this.#handlerList.findHandlerFor(element);
            let response;

            if(!theHandler && !onlyHandled){
                response = element;
            } else if (theHandler) {
                response = theHandler.process(element);
            }

            if(!response) continue;

            if(objectResult[element.id]){
                if(!Array.isArray(objectResult[element.id])){
                    objectResult[element.id] = [objectResult[element.id]];
                }

                objectResult[element.id].push(response);
            } else {
                objectResult[element.id] = response;
            }

        }

        return objectResult;
    }

    json(htmlElement){
        if(typeof htmlElement === 'string')
            htmlElement = document.getElementById(htmlElement);

        let objectResult = {}

        const allElements = htmlElement.querySelectorAll(this.#handlerList.getQuerySelector());
        console.log(allElements);

        for(const element of allElements){
            const theHandler = this.#handlerList.findHandlerFor(element);
            if(!theHandler) continue;

            let response = theHandler?.JSONProcess(element);
            
            if(response === undefined || response === null) continue;

            let key = element?.id || element?.name || this.#randName;
            if(theHandler?.customKey) key = theHandler?.customKey(element);

            let current = element.parentElement;
            let familyTree = [];
            while(current && current !== htmlElement){
                const parentKey = current.id || current.name || this.#randName;
                familyTree.unshift(parentKey);
                current = current.parentElement;
            }

            let target = objectResult;
            for(const member of familyTree){
                if(!target[member]){
                    target[member] = {};
                } else if (typeof target[member] !== "object"){
                    target[member] = {value: target[member]};
                } 
                target = target[member];
            }

            if (target[key]) {
                if (!Array.isArray(target[key])) target[key] = [target[key]];
                target[key].push(response);
            } else target[key] = response;
        }
        return objectResult;
    }

    #randName(){
        return `no_name_${Math.random().toString(36).slice(2)}`;
    }
}