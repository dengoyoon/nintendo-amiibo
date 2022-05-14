import { Amiibo } from "../model/types";

export default abstract class View {
    private template : string;
    private renderTemplate : string;
    private container : HTMLElement;
    private htmlList : string[];

    constructor(containerId : string, template : string) {
        const containerElement = document.getElementById(containerId);
        if (!containerElement) {
            throw "최상위 컨테이너가 없어 UI를 진행하지 못합니다.";
        }
        this.container = containerElement;
        this.template = template;
        this.renderTemplate = template;
        this.htmlList = [];
    }

    protected updateView = () : void => {
        if (this.container) {
            this.container.innerHTML = this.renderTemplate;
            this.renderTemplate = this.template;
        } else {
            console.log("최상위 컨테이너가 없어 UI를 진행하지 못합니다.");
        }
    }

    protected addHtml = (htmlString : string) : void => {
        this.htmlList.push(htmlString);
    }

    protected getHtml = () : string => {
        const snapshot = this.htmlList.join('')
        this.clearHtmlList();
        return snapshot;
    }

    private clearHtmlList = () : void => {
        this.htmlList = [];
    }

    protected setTemplateData = (key : string, value : string) : void => {
        this.renderTemplate = this.renderTemplate.replace(`@${key}`, value);
    }

    abstract render() : void;
}