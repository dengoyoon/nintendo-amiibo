import { Amiibo } from "./model/types";

export default class Bag {
    private _bagStack : Amiibo[];
    
    constructor() {
        this._bagStack = [];
    }

    pushBagStack(item : Amiibo) : void {
        this._bagStack.push(item);
    }

    get bagStack() : Amiibo[] {
        return this._bagStack;
    }
}