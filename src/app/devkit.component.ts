import { Component, Input, Inject  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';  
import {ActivatedRoute} from "@angular/router";
import { environment } from '../environments/environment';

@Component({
  selector: 'devkit',
  templateUrl: './devkit.component.html',
  styleUrls: ['./devkit.component.css']
})
export class DevkitComponent {
  title = 'Devkit';
  public ToolsInventory: InventoryMaster[] = [];
  public Devkit: DevkitMaster[] = [];
  AddTable: Boolean = false;  
  public sToolID: number = 0;
  public sAquire = "";
  public sAquireType = "";
  public sDescription = "";
  public sName = "";
  public sUrlRef = "";
  public bseUrl: string = ""; 
  myName: string;

  constructor(public http: Http, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {
    this.myName = "Devkit"; 
    this.bseUrl = environment.apiUrl;
    this.route.params.subscribe( params => 
      {
        this.getData(params['id']);
        this.getDevKitData(params['id']);
      }
    );
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
  aquireType: string;
  categoryID: number;
  description: string;
  name: string;
  urlRef: string;    
}  

export interface DevkitMaster {
  devkitID: number;
  shortName:string;
  name: string;
  description: string;
  email: string;
}  
