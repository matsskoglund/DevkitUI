import { Component, Input, Inject  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'Devkit';
  public DevkitsInventory: DevkitMaster[] = [];
  public bseUrl: string = ""; 


  constructor(public http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.bseUrl = "http://localhost:5000/";
    this.getDevKitData();
  }

  getDevKitData() {
    this.http.get(this.bseUrl + 'api/Devkits/').subscribe(result => {
        this.DevkitsInventory = result.json();
    }, error => console.error(error));        
  }
}

export interface DevkitMaster {
  devkitID: number;
  name: string;
  shortName: string;
  description: string;
  email: string;
}  
