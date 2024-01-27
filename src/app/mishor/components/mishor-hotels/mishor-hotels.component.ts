import { Component } from '@angular/core';
import { ColDef, ColGroupDef, IServerSideDatasource } from 'ag-grid-community';
import { MishorHotelsService } from '../../services/mishor-hotels.service';
import { MishorDestinationsService } from '../../services/mishor-destinations.service';
import { MishorHotelsDestinationsService } from '../../services/mishor-hotels-destinations.service';
import { GridService } from 'src/app/grid.service';

@Component({
  selector: 'app-mishor-hotels',
  templateUrl: './mishor-hotels.component.html',
  styleUrls: ['./mishor-hotels.component.scss']
})
export class MishorHotelsComponent {
  dataSource: IServerSideDatasource;

  columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Destination',
      children: [
        {
          colId: 'destination.name', field: 'relationships.destination.data.attributes.name', headerName: 'Name', width: 170
        },
        {
          colId: 'destination.countryId', field: 'relationships.destination.data.attributes.countryId', headerName: 'Country', width: 100
        }
      ]
    },
    {
      headerName: 'Hotel',
      children: [
        {
          colId: 'hotel.name', field: 'relationships.hotel.data.attributes.name', headerName: 'Name', width: 200
        },
        {
          colId: 'hotel.phone', field: 'relationships.hotel.data.attributes.phone', headerName: 'Phone', width: 170
        },
        {
          colId: 'hotel.stars', field: 'relationships.hotel.data.attributes.stars', headerName: 'Grade', width: 70
        },
        {
          colId: 'hotel.status', field: 'relationships.hotel.data.attributes.status', headerName: 'Status', width: 70
        }
      ]
    },
    {
      headerName: 'Location',
      children: [
        {
          colId: 'address', field: 'relationships.hotel.data.attributes.address', headerName: 'Address', width: 170
        },
        {
          colId: 'fax', field: 'relationships.hotel.data.attributes.fax', headerName: 'Fax', width: 170
        },
        {
          colId: 'zipCode', field: 'relationships.hotel.data.attributes.zipCode', headerName: 'zipCode', width: 170
        },
        {
          colId: 'latitude', field: 'relationships.hotel.data.attributes.latitude', headerName: 'Latitude', width: 90
        },
        {
          colId: 'longitude', field: 'relationships.hotel.data.attributes.longitude', headerName: 'longitude', width: 90
        }
      ]
    }
  ];

  defaultColDef: ColDef = {
    filter: true,
    sortable: true,
    resizable: true,
  };

  public constructor(private service: MishorHotelsDestinationsService,
    private gridService: GridService) {

    this.dataSource = this.gridService.getDataSource(this.service, {
      include: ['hotel', 'destination']
    });
  }
}
