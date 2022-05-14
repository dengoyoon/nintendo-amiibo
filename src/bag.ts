import { Amiibo } from "./model/types";

export default class Bag {
    private _bagStack : Amiibo[];
    private bagContainer : HTMLElement;
    
    constructor(containerId : string) {
        this._bagStack = [];
        const containerElement = document.getElementById(containerId);
        if (!containerElement) {
            throw "가방의 id가 없어 진행하지 못합니다.";
        }
        this.bagContainer = containerElement;
        this.bagContainer.addEventListener("click", () => {
            
        });
    }

    pushBagStack(item : Amiibo) : void {
        this._bagStack.push(item);
    }

    get bagStack() : Amiibo[] {
        return this._bagStack;
    }

    getBagSize() : number {
        return this._bagStack.length;
    }


}