import { Amiibo } from "./model/types";

const bagTemplate = `
<div id = "bag">
    <div id = "bag-content">
        <div id = "bag-list">
            @bag_item
        </div>
        <div class = "button-section">
            <div id = "buy-button">구매하기</div>
            <div id = "close-button">닫기</div>
        </div>
    </div>
</div>
`;

const bagItemTemplate = `
<div id = "bag-item">
    <img
        class = "bag-item-img" 
        src = "@amiibo_img"/>
    <div
        class = "item-amiibo-text"
        id = "item-amiibo-text-head">
            @amiibo_name
    </div>
    <div
        class = "item-amiibo-text">
            @game_series
    </div>
    <div
        class = "item-amiibo-text">
            @release_date
    </div>    
</div>
`;

export default class Bag {
    private _bagStack : Amiibo[];
    private bagButton : HTMLElement;
    private container : HTMLElement;
    private _existingHtmlLength : number;
    
    constructor(containerId : string, bagButtonId : string) {
        this._bagStack = [];
        const containerElement = document.getElementById(containerId);
        if (!containerElement) {
            throw "다이얼로그 컨테이너 id가 없어 진행하지 못합니다.";
        }
        const bagButtonElement = document.getElementById(bagButtonId);
        if (!bagButtonElement) {
            throw "가방버튼의 id가 없어 진행하지 못합니다.";
        }
        this.bagButton = bagButtonElement;
        this.container = containerElement;
        this._existingHtmlLength = this.container.innerHTML.length;
        this.bagButton.addEventListener("click", () => {
            this.show();
        });
    }

    show() {
        const itemsHtml : string[] = [];
        this.bagStack.forEach(item => {
            let renderItemTemplate = bagItemTemplate;
            renderItemTemplate = renderItemTemplate.replace('@amiibo_img', item.image);
            renderItemTemplate = renderItemTemplate.replace('@amiibo_name', item.name);
            renderItemTemplate = renderItemTemplate.replace('@game_series', item.gameSeries);
            renderItemTemplate = renderItemTemplate.replace('@release_date', item.release.jp);
            itemsHtml.push(renderItemTemplate);
        });
        this.container.innerHTML += bagTemplate.replace('@bag_item', itemsHtml.join(''));
        document.getElementById('close-button')?.addEventListener('click', () => {
            this.container.innerHTML = this.container.innerHTML.replace(bagTemplate.replace('@bag_item', itemsHtml.join('')), "");
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

    get existingHtmlLength() : number {
        return this._existingHtmlLength;
    }


}