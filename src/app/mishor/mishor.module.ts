import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MishorRoutingModule } from './mishor-routing.module';
import { MishorComponent } from './mishor.component';
import { MishorCountriesService } from './services/mishor-countries-service';
import { AgGridModule } from 'ag-grid-angular';
import { MishorCountriesComponent } from './components/mishor-countries/mishor-countries.component';
import { MishorHotelsComponent } from './components/mishor-hotels/mishor-hotels.component';
import { MishorDestinationsService } from './services/mishor-destinations.service';
import { MishorHotelsService } from './services/mishor-hotels.service';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { ModuleRegistry } from 'ag-grid-community';
import { MishorDestinationsComponent } from './components/mishor-destinations/mishor-destinations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MishorHotelsDestinationsService } from './services/mishor-hotels-destinations.service';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    MishorComponent,
    MishorCountriesComponent,
    MishorHotelsComponent,
    MishorDestinationsComponent
  ],
  imports: [
    CommonModule,
    MishorRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MishorCountriesService,
    MishorDestinationsService,
    MishorHotelsService,
    MishorHotelsDestinationsService
  ],
})
export class MishorModule {
  public constructor(private hotelsService: MishorHotelsService,
    private destinationsService: MishorDestinationsService,
    private countriesService: MishorCountriesService,
    private hotelsDestinationsService: MishorHotelsDestinationsService) {
  }
}

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ServerSideRowModelModule
]);