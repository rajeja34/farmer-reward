/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Farmer } from '../farmer.model';
import { FarmerService } from '../farmer.service';

@Component({
  selector: 'app-farmer-details',
  templateUrl: './farmer-details.page.html',
  styleUrls: ['./farmer-details.page.scss'],
})
export class FarmerDetailsPage implements OnInit {

private farmerSub: Subscription;
  _farmerDetails: Farmer;
  get farmerDetails() {
    return this._farmerDetails;
  }
  constructor(private activatedRoute: ActivatedRoute,
              private farmerService: FarmerService,
              private zone: NgZone) { }

  ngOnInit() {
     this.farmerSub = this.farmerService.farmer.subscribe(farmers => {
      //console.log(farmers.length);
      this._farmerDetails = farmers[0];
    });
    this.activatedRoute.paramMap.subscribe(paramMap => {
        if(!paramMap.has('farmerId')) {
          return;
        }

      const farmerId = paramMap.get('farmerId');
      //this._farmerDetails = this.farmerService.getFarmer(farmerId);
      this.farmerService.fetchFarmer(farmerId).subscribe();

      /*this.zone.runOutsideAngular(() => {
            setInterval(() => {
                this._farmerDetails = this.farmerService.getFarmer(farmerId);
            }, 1);
        });*/
    });
  }

  encodeImage(img){
    return 'data:image/jpeg;base64,' + img;
  }
}
