import HandlerList from "/FieldCollector/HandlerList.js";
import * as handlers from "/FieldCollector/handlers/index.js";

export default class Collector {
    #handlerList;

    constructor(handlerList){
        if(handlerList == null)
            handlerList = this.#getDefaultHanderList();

        this.#handlerList = handlerList;
    }

    #getDefaultHanderList(){
        const defualtList = new HandlerList();
        defualtList.addHandler(HTMLInputElement, "input", handlers.TextInputHandler);

        return defualtList;
    }

    search(htmlElement){
        if(typeof htmlElement === 'string')
            htmlElement = document.getElementById(htmlElement);

        let objectResult = {}

        const allElements = htmlElement.querySelectorAll(this.#handlerList.getQuerySelector());
        console.log(allElements);

        for(const element of allElements){
            const theHandler = this.#handlerList.findHandlerFor(element);
            console.log(theHandler);
            objectResult[element.id] = theHandler.process(element);
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
            console.log(theHandler);
            objectResult[element.id] = theHandler.JSONProcess(element);
        }

        return objectResult;
    }
}