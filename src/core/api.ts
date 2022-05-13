import { Amiibo, AmiiboResponse } from "../model/types";

export class Api {
    url : string;

    constructor(url : string) {
        this.url = url;
    }

    protected async request<AjaxResponse>() : Promise<AjaxResponse> {
        const response = await fetch(this.url)
        return await response.json() as AjaxResponse;
    }
}

export class AmiiboListApi extends Api {
    async getData() : Promise<AmiiboResponse> {
        return this.request<AmiiboResponse>();
    }
}

// export class Api {
//     url;

//     constructor(url) {
//         this.url = url;
//     }

//     async request() {
//         const response = await fetch(this.url);
//         return await response.json();
//     }
// }