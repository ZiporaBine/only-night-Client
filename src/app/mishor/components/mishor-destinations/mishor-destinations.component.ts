import { Component } from '@angular/core';
import { MishorDestinationsService } from '../../services/mishor-destinations.service';
import { IServerSideDatasource, ColDef, ColGroupDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridService } from 'src/app/grid.service';

@Component({
  selector: 'app-mishor-destinations',
  templateUrl: './mishor-destinations.component.html',
  styleUrls: ['./mishor-destinations.component.scss']
})
export class MishorDestinationsComponent {
  dataSource: IServerSideDatasource;
  gridApi!: GridApi<any>;

  formGroup: FormGroup = new FormGroup({
    criteria: new FormControl('', [Validators.required])
  });

  columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Destination',
      children: [
        {
          colId: 'name', field: 'attributes.name', headerName: 'Name', width: 170
        },
        {
          colId: 'type', field: 'attributes.type', headerName: 'Type', width: 170
        }
      ]
    },
    {
      headerName: 'Country',
      children: [
        {
          colId: 'countryId', field: 'attributes.countryId', headerName: 'Id', width: 170
        },
        {
          colId: 'country.name', field: 'relationships.country.data.attributes.name', headerName: 'Name', width: 170
        }
      ]
    }
  ];

  defaultColDef: ColDef = {
    filter: true,
    sortable: true,
    resizable: true,
  };

  public constructor(private service: MishorDestinationsService,
    private gridService: GridService) {

    this.dataSource = this.gridService.getDataSource(this.service, {
      include: ['country']
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onSubmit(): void {
    this.gridApi.refreshServerSide();
  }
}
