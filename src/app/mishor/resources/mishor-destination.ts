import { DocumentResource, Resource } from "ngx-jsonapi";
import { MishorCountry } from "./mishor-country";

export class MishorDestination extends Resource {
    public override relationships = {
        country: new DocumentResource<MishorCountry>()
    };
}
