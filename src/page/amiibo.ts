import View from "../core/view";

const template = `
    <div
        class = "container">
        ammiiiiiibo
    </div>
`;

export default class AmiiboView extends View {
    constructor(containerId : string) {
        super(containerId, template);
    }

    render = () : void => {
        
        this.updateView();
    }
}