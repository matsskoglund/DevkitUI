import { Component, Input, Inject  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Devkit';
  public ToolsInventory: InventoryMaster[] = [];
  AddTable: Boolean = false;  
  public sToolID: number = 0;
  public sAquire = "";
  public sCategoryID: number = 0;
  public sDescription = "";
  public sName = "";
  public sUrlRef = "";
  public bseUrl: string = ""; 
  myName: string;

  constructor(public http: Http) {
    this.myName = "Devkit"; 
    this.bseUrl = "http://localhost:5000/";
    this.getData();
}
getData() {

  this.http.get(this.bseUrl + 'api/tools').subscribe(result => {
      this.ToolsInventory = result.json();
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

