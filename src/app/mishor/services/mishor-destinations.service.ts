import { Injectable } from '@angular/core';
import { MishorDestination } from '../resources/mishor-destination';
import { Service } from 'ngx-jsonapi';
import { MishorModule } from '../mishor.module';

@Injectable({
  providedIn: 'root'
})
export class MishorDestinationsService extends Service<MishorDestination> {
  public override resource = MishorDestination;
  public override type = 'destinations';
}
