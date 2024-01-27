import { DocumentCollection, Resource } from "ngx-jsonapi";
import { MishorDestination } from "./mishor-destination";

export class MishorHotel extends Resource {
    public override relationships = {
        destinations: new DocumentCollection<MishorDestination>()
    };
}
