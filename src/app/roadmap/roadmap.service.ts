import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class RoadmapService {
    constructor(
        private _httpClient : HttpClient
    ) {
    }

    getData() {
        var tHeaders: HttpHeaders = new HttpHeaders;
        tHeaders = tHeaders.set('Authorization', 'Basic ' + btoa('treesacyriac369@gmail.com:z5AfAU7joOrS0HUOELiNAE74'));
        tHeaders.append('Content-Type', 'application/json');
        const url = '/rest/api/2/search?jql=';
        return this._httpClient.get<any[]>(url, { headers: tHeaders });
    }

}