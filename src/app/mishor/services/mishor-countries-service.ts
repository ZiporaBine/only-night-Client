import { Service } from "ngx-jsonapi";
import { MishorCountry } from "../resources/mishor-country";
import { Injectable } from "@angular/core";
import { MishorModule } from "../mishor.module";

@Injectable({
    providedIn: 'root'
})
export class MishorCountriesService extends Service<MishorCountry> {
    public override resource = MishorCountry;
    public override type = 'countries';
}
