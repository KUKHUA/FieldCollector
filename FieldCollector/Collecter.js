import { HandlerList } from "./HandlerList";

export class Collector {
    #handlerList;
    #htmlElement;

    constructor(htmlElement, handlerList){
        if(!htmlElement) throw new Error("Invaild htmlElement: not found or null.");

        if(typeof htmlElement === "string")
            htmlElement = document.getElementById(htmlElement);

        if(handlerList === null)
            handlerList = this.#getDefaultHanderList();

        this.#handlerList = handlerList;
        this.#htmlElement = htmlElement;
    }

    #getDefaultHanderList(){
        defualtList = new HandlerList();

    }
}