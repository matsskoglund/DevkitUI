import { Component, Input, Inject  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'Devkit';
  public ToolsInventory: InventoryMaster[] = [];
  public Devkit: DevkitMaster[] = [];
  AddTable: Boolean = false;  
  public sToolID: number = 0;
  public sAquire = "";
  public sCategoryID: number = 0;
  public sDescription = "";
  public sName = "";
  public sUrlRef = "";
  public bseUrl: string = ""; 
  myName: string;

  constructor(public http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.myName = "Devkit"; 
    console.error(baseUrl);
    this.bseUrl = "http://localhost:5000/";
    this.getData(1);
    this.getDevKitData(1);
  }
  getData(devkitid: number) {
    this.http.get(this.bseUrl + 'api/Devkits/tools/' + devkitid).subscribe(result => {
        this.ToolsInventory = result.json();
        
    }, error => console.error(error));        
  }

  getDevKitData(devkitid: number) {
    this.http.get(this.bseUrl + 'api/Devkits/' + devkitid).subscribe(result => {
        this.Devkit = result.json();
    }, error => console.error(error));        
  }
}

export interface InventoryMaster {
  toolID: number;
  aquire: string;
  categoryID: number;
  description: string;
  name: string;
  urlRef: string;    
}  

export interface DevkitMaster {
  devkitID: number;
  name: string;
  description: string;
  email: string;
}  
