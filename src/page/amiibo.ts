import { AmiiboListApi } from "../core/api";
import View from "../core/view";
import { Amiibo } from "../model/types";

const AMIIBO_URL = "https://www.amiiboapi.com/api/amiibo/?gameseries=@game_series"

const template = `
    <div
        class = "container">
        @amiibo_list
    </div>
`;

const itemTemplate = `
    <div
        class = "line-amiibo">
        <div
            class = "item-amiibo">
            <img
                class = "item-amiibo-img"
                src = "@amiibo_img_left"
                alt = "mario.."/>
            <div
                class = "item-amiibo-text"
                id = "item-amiibo-text-head">
                    @amiibo_name_left
            </div>
            <div
                class = "item-amiibo-text">
                    @game_series_left
            </div>
            <div
                class = "item-amiibo-text">
                    @release_date_left
            </div>
        </div>
        <div
            class = "item-amiibo">
            <img
                class = "item-amiibo-img"
                src = "@amiibo_img_right"
                alt = "mario.."/>
            <div
                class = "item-amiibo-text"
                id = "item-amiibo-text-head">
                    @amiibo_name_right
            </div>
            <div
                class = "item-amiibo-text">
                    @game_series_right
            </div>
            <div
                class = "item-amiibo-text">
                    @release_date_right
            </div>
        </div>
    </div>
`;

export default class AmiiboView extends View {
    private _gameSeries : string;
    private _amiibos : Amiibo[];

    constructor(containerId : string) {
        super(containerId, template);
        this._gameSeries = "";
        this._amiibos = [];
    }

    render = async () : Promise<void> => {
        this.gameSeries = location.hash.slice(9);
        const api = new AmiiboListApi(AMIIBO_URL.replace('@game_series', this.gameSeries));
        this.amiibos = await (await api.getData()).amiibo;
        
        let tempItem = itemTemplate;
        for (let i = 0 ; i < this.amiibos.length ; i ++) {
            const { gameSeries, image, name, release } = this.amiibos[i];
            if (i % 2 == 0) {
                tempItem = tempItem.replace("@amiibo_img_left", image);
                tempItem = tempItem.replace("@amiibo_name_left", name);
                tempItem = tempItem.replace("@game_series_left", gameSeries);
                tempItem = tempItem.replace("@release_date_left", release.jp);
                if (i + 1 == this.amiibos.length) {
                    // 눈속임용 ㅠㅠ
                    tempItem = tempItem.replace("@amiibo_img_right", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2048px-Solid_white.svg.png");
                    tempItem = tempItem.replace("@amiibo_name_right", "");
                    tempItem = tempItem.replace("@game_series_right", "");
                    tempItem = tempItem.replace("@release_date_right", "");
                    this.addHtml(tempItem);
                }
            } else {
                tempItem = tempItem.replace("@amiibo_img_right", image);
                tempItem = tempItem.replace("@amiibo_name_right", name);
                tempItem = tempItem.replace("@game_series_right", gameSeries);
                tempItem = tempItem.replace("@release_date_right", release.jp);
                this.addHtml(tempItem);
                tempItem = itemTemplate;
            }
            
        }

        this.setTemplateData('amiibo_list', this.getHtml());
        this.updateView();
    }

    set gameSeries(series : string) {
        switch(series) {
            case "mario":
                this._gameSeries = "Super Mario";
                break;
            case "zelda":
                this._gameSeries = "The Legend of Zelda";
                break;
            case "donkey":
                this._gameSeries = "Donkey Kong";
                break;
            case "kirby":
                this._gameSeries = "Kirby";
                break;
            case "pokemon":
                this._gameSeries = "Pokemon";
                break;
            case "animal":
                this._gameSeries = "Animal Crossing";
                break;
            default:
                break;
        }
    }

    get gameSeries() : string {
        return this._gameSeries;
    }

    set amiibos(array : Amiibo[]) {
        this._amiibos = array;
    }

    get amiibos() : Amiibo[] {
        return this._amiibos;
    }
}