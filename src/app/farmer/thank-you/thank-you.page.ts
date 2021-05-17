import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Farmer } from '../farmer.model';
import { FarmerService } from '../farmer.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.scss'],
})
export class ThankYouPage implements OnInit {

  farmerDetails: Farmer;
  constructor(private activatedRoute: ActivatedRoute,
              private farmerService: FarmerService) { }

  ngOnInit() {
    this.farmerDetails = this.farmerService.getFarmer();
    /*this.activatedRoute.paramMap.subscribe(paramMap => {
        if(!paramMap.has('farmerId')) {
          return;
        }

      const farmerId = paramMap.get('farmerId');

    });*/
  }

  encodeImage(img){
    return 'data:image/jpeg;base64,' + img;
  }
}
