import { DocumentCollection, DocumentResource, Resource } from "ngx-jsonapi";
import { MishorDestination } from "./mishor-destination";
import { MishorHotel } from "./mishor-hotel";

export class MishorHotelDestination extends Resource {
    public override relationships = {
        hotel: new DocumentResource<MishorHotel>(),
        destination: new DocumentResource<MishorDestination>()
    };
}
