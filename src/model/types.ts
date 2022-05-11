import View from "../core/view";

export interface RouteInfo {
    path : string;
    page : View;
}

export interface AmiiboResponse {
    amiibo : Amiibo[];
}

export interface Amiibo {
    amiiboSeries : string;
    character : string;
    gameSeries : string;
    image : string;
    name : string;
    type : string;
    release : Country;
}

interface Country {
    au : string;
    eu : string;
    jp : string;
    na : string;
}