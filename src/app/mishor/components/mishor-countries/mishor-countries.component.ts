import { Component } from '@angular/core';
import { ColDef, ColGroupDef, IServerSideDatasource, GridReadyEvent } from 'ag-grid-community';
import { MishorCountriesService } from '../../services/mishor-countries-service';
import { GridService } from 'src/app/grid.service';

@Component({
  selector: 'app-mishor-countries',
  templateUrl: './mishor-countries.component.html',
  styleUrls: ['./mishor-countries.component.scss']
})
export class MishorCountriesComponent {
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Country',
      children: [
        {
          colId: 'name', field: 'attributes.name', headerName: 'Name', pinned: 'left', width: 170
        },
        {
          colId: 'continent', field: 'attributes.continent', headerName: 'Continent', pinned: 'left', width: 170
        },
        {
          colId: 'region', field: 'attributes.region', headerName: 'Region', pinned: 'left', width: 170
        },
        {
          colId: 'currency', field: 'attributes.currency', headerName: 'Currency', pinned: 'left', width: 170
        }
      ]
    }
  ];

  defaultColDef: ColDef = {
    filter: true,
    sortable: true,
    resizable: true,
  };

  public constructor(private countriesService: MishorCountriesService,
    private gridService: GridService) {

    this.dataSource = this.gridService.getDataSource(this.countriesService)
  }

  dataSource: IServerSideDatasource;

  onGridReady(params: GridReadyEvent) {
  }

}
