import { Injectable } from '@angular/core';
import { IServerSideDatasource } from 'ag-grid-community';
import { DocumentCollection, Resource, Service } from 'ngx-jsonapi';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  criteria:string = '';

  constructor() { }

  getDataSource(service: Service<any>, args: any = {}): IServerSideDatasource {
    return {
      getRows(params: any) {
        let pageIndex = params.api.paginationGetCurrentPage();
        let pageSize = params.api.paginationGetPageSize();
        let pageNumber = pageIndex + 1;
        let sort: any[] = [];

        params.request.sortModel.forEach((element: any) => {
          switch (element.sort) {
            case 'asc':
              sort.push(element.colId);
              break;
            case 'desc':
              sort.push('-' + element.colId);
              break;
          }
        });

        let query:any = {
          // include: ['destinations'],
          // fields: {
          //     countries: ['name']
          // }\
          // remotefilter: { name: 'like:abb' },
          page: { number: pageNumber + 1, size: pageSize },
          sort: sort
        };

        Object.assign(query, args);

        console.log(query);

        service.all(query).subscribe({
          next: (collection: DocumentCollection) => {
            if (collection.loaded) {
              console.log(collection);

              params.success({
                rowData: collection.data,
                rowCount: collection.meta["total"]
              });
            }
          },
          error: (error: any) => {
            params.fail();
          }
        });
      }
    };
  }
}
