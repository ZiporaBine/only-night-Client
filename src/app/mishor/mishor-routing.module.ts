import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MishorComponent } from './mishor.component';
import { MishorCountriesComponent } from './components/mishor-countries/mishor-countries.component';
import { MishorHotelsComponent } from './components/mishor-hotels/mishor-hotels.component';
import { MishorDestinationsComponent } from './components/mishor-destinations/mishor-destinations.component';

const routes: Routes = [
  {
    path: '', component: MishorComponent,
    children: [
      {
        path: 'countries',
        title: 'Mishor - Countries',
        component: MishorCountriesComponent,
      },
      {
        path: 'destinations',
        title: 'Mishor - Destinations',
        component: MishorDestinationsComponent
      },
      {
        path: 'hotels',
        title: 'Mishor - Hotels',
        component: MishorHotelsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MishorRoutingModule { }
