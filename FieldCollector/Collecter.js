import HandlerList from "/FieldCollector/HandlerList.js";
import * as inputHandlers from "/FieldCollector/handlers/input/index.js";

export default class Collector {
    #handlerList;

    constructor(handlerList){
        if(handlerList == null)
            handlerList = this.#getDefaultHanderList();

        this.#handlerList = handlerList;
    }

    #getDefaultHanderList(){
        const defualtList = new HandlerList();
        defualtList.addHandler(HTMLInputElement, `input[type="text"], input[type="password"], input:not([type])`, inputHandlers.TextHandler);
        //defualtList.addHandler(HTMLInputElement, "input", inputHandlers.ButtonHandler);
        defualtList.addHandler(HTMLInputElement, `input[type="checkbox"]`, inputHandlers.CheckBoxHandler);
        defualtList.addHandler(HTMLInputElement, `input[type="color"]`, inputHandlers.ColorHandler);
        defualtList.addHandler(HTMLInputElement, `input[type="date"]`, inputHandlers.DateHandler);
        defualtList.addHandler(HTMLInputElement, `input[type="datetime-local"]`, inputHandlers.DateTimeHandler);

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
            const response = theHandler.JSONProcess(element);
        
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
}