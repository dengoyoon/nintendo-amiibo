import View from "../core/view";

const template = `
    <div>Nintendo Amiibo</div>
`;

export default class HomeView extends View {
    constructor(containerId : string) {
        super(containerId, template);
    }

    render = () : void => {
        this.updateView();
    }
}