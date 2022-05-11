import View from "../core/view";

const template = `
    <div
        class = "container">
        <div
            class = "title">nintendo amiibo</div>
        <div>
        <div
            class = "line-first-img">
            <div
                class = "img-mario"></div>
            <div
                class = "img-zelda"></div>
        </div>
    </div>
`;

export default class HomeView extends View {
    constructor(containerId : string) {
        super(containerId, template);
    }

    render = () : void => {
        
        this.updateView();
    }
}