import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Farmer } from './farmer.model';
import { FarmerService } from './farmer.service';


@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.page.html',
  styleUrls: ['./farmer.page.scss'],
})
export class FarmerPage implements OnInit {
  farmers: Farmer[];
  private farmerSub: Subscription;
  constructor(private farmerService: FarmerService) { }

  ngOnInit() {
    this.farmerSub = this.farmerService.farmers.subscribe(farmers => {
      //console.log(farmers.length);
      this.farmers = farmers;
    });
  }

  ionViewWillEnter(){
    this.farmerService.fetchFarmers().subscribe();
  }

  encodeImage(img){
    return 'data:image/jpeg;base64,' + img;
  }
}
