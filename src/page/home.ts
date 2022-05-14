import View from "../core/view";
import Bag from "../bag";

const template = `
    <div
        class = "container">
        <div
            class = "title">nintendo amiibo</div>
        <div>
        <div
            class = "line-img">
            <a 
                class = "img-home-box"
                id = "img-mario"
                href="#/amiibo/mario">
            </a>
            <a
                class = "img-home-box"
                id = "img-zelda"
                href="#/amiibo/zelda"></a>
        </div>
        <div
            class = "line-img">
            <a
                class = "img-home-box"
                id = "img-donkey"
                href="#/amiibo/donkey"></a>
            <a
                class = "img-home-box"
                id = "img-kirby"
                href="#/amiibo/kirby"></a>
        </div>
        <div
            class = "line-img">
            <a
                class = "img-home-box"
                id = "img-pokemon"
                href="#/amiibo/pokemon"></a>
            <a
                class = "img-home-box"
                id = "img-animal"
                href="#/amiibo/animal"></a>
        </div>
    </div>
`;

export default class HomeView extends View {
    private bag : Bag;

    constructor(containerId : string, bag : Bag) {
        super(containerId, template);
        this.bag = bag;
    }

    render = () : void => {
        this.updateView();
    }
}