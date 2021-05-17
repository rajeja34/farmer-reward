import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Farmer } from './farmer.model';
import { BehaviorSubject } from 'rxjs';
import { map, filter, scan, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

server = 'https://dev.api3.agunity.com/api';
farmerList = this.server + '/Agriwards/People/List';
farmerGet = this.server + `/Agriwards/Person/`;

private _farmers = new BehaviorSubject<Farmer[]>([]);
private _farmer = new BehaviorSubject<Farmer[]>([]);
private farmerCache ;

get farmers() {
  // eslint-disable-next-line no-underscore-dangle
  return this._farmers.asObservable();
}

get farmer() {
  // eslint-disable-next-line no-underscore-dangle
  return this._farmer.asObservable();
}


 constructor(private http: HttpClient) { }

  fetchFarmers(){
    return this.http.get(this.farmerList).pipe(map(farmers=> {
      const farmerList = [];
        for(const farmer in farmers){
          if(farmers.hasOwnProperty(farmer)){
            // eslint-disable-next-line @typescript-eslint/dot-notation
            //console.log(JSON.stringify(farmers[farmer]));
            farmerList.push(farmers[farmer]);
          }
        }
        return farmerList;
      }),
      tap(farmers => {
        // eslint-disable-next-line no-underscore-dangle
        this._farmers.next(farmers);
      })
    );
  }

  fetchFarmer(id){
    return this.http.get(this.farmerGet+id).pipe(map(farmer=> {
        console.log(JSON.stringify(farmer));
        const farmerList = [];
        this.farmerCache = farmer;
        farmerList.push(farmer);
        return farmerList;
      }),
      tap(farmers => {
        // eslint-disable-next-line no-underscore-dangle
        this._farmer.next(farmers);
      })
    );
  }

  getFarmer(){
    return {...this.farmerCache};
  }
}
