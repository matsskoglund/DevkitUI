import { Component, Input, Inject  } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';  
import {ActivatedRoute} from "@angular/router";
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'devkit',
  templateUrl: './modifydevkit.component.html'
 
})
export class ModifyDevkitComponent {
  title = 'Devkit';
  public editMode: boolean = false;
  public ToolsInventory: InventoryMaster[] = [];
  public DevkitToolsInventory: InventoryMaster[] = [];
  public DevkitToolsOriginal: InventoryMaster[] = [];
  public DevkitOriginal: DevkitMaster;
  public toolsLeft: InventoryMaster[] = [];
  public Devkit: DevkitMaster = {
    devkitID: 0,
    shortName:"",
    name: "",
    description: "",
    email: ""
  };
  AddTable: Boolean = false;  
  public sToolID: number = 0;
  public sAquire = "";
  public sAquireType = "";
  public sDescription = "";
  public sName = "";
  public sUrlRef = "";
  public bseUrl: string = ""; 
  myName: string;
  public selectedToolId: number;
  public selectedTool:Tool; 
  dirty:boolean = false;

  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {
    this.myName = "Devkit"; 
    this.bseUrl = environment.apiUrl;
    this.route.params.subscribe( params => 
      {
        this.getDevKitData(params['id']);  
        this.getDevkitTools(params['id']);         
        this.getAllTools();       
      }
    );
  }

  getDevKitData(devkitid: number){
    this.http.get<DevkitMaster>(this.bseUrl + 'api/Devkits/' + devkitid)
    .subscribe(devk => {
          this.Devkit = devk;
        });
  }



  getDevkitTools(devkitid: number) {
    this.http.get<InventoryMaster[]>(this.bseUrl + 'api/Devkits/tools/' + devkitid).subscribe(result => {
        this.DevkitToolsInventory = result;
        
    }, error => console.error(error));        
  }
  getAllTools() {
    this.http.get<InventoryMaster[]>(this.bseUrl + 'api/Tools/').subscribe(result => {
        this.ToolsInventory = result;

    }, error => console.error(error));        
  }

  edit(){
    this.editMode =true;
    // Create a copy of original devkit  
    this.DevkitToolsOriginal = this.DevkitToolsInventory.slice(0);    
    
    this.DevkitOriginal = {      
      devkitID: this.Devkit.devkitID,
      shortName:this.Devkit.shortName,
      name: this.Devkit.name,
      description: this.Devkit.description,
      email: this.Devkit.email
    };
    this.updateToolsLeft();
}
  cancel()
  {
    this.DevkitToolsInventory = this.DevkitToolsOriginal.slice(0);
    this.Devkit = this.DevkitOriginal;
  }

  deleteDevkitTool(Id:number)
  {    
    var obj = this.DevkitToolsInventory.splice(Id,1);
    this.toolsLeft.push(obj[0]);
  }


 onSelect(selectedToolId:number){

   this.selectedTool = this.toolsLeft[selectedToolId];
 }
  updateToolsLeft(){
    this.toolsLeft = this.ToolsInventory.slice(0);
    for( var i=this.toolsLeft.length - 1; i>=0; i--){
     
       for( var j=0; j<this.DevkitToolsInventory.length; j++){
           if(this.toolsLeft[i] && (this.toolsLeft[i].toolID === this.DevkitToolsInventory[j].toolID)){
            this.toolsLeft.splice(i, 1);
          }
        }
    }
  }

  addNewTool(){
    this.DevkitToolsInventory.push(this.selectedTool); 
    this.updateToolsLeft();
    this.selectedTool = null;
    this.selectedToolId = -1;
  }

  save(devkit: DevkitMaster)
  {
    this.editMode = false; 
    var theDevkit:DevkitMaster;
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   // headers.append('Content-Type', 'application/json; charset=utf-8');
    const req = this.http.delete(this.bseUrl + 'api/Devkits/tools/'+ this.Devkit.devkitID,
    { headers: headers });
    req.subscribe(
      response => {
        for (var i = 0, len = this.DevkitToolsInventory.length; i < len; i++) {                         
          var req2 = this.http.post(this.bseUrl + 'api/Devkits/tools/', JSON.stringify({ 
            DevkitID: this.Devkit.devkitID, 
            ToolId: this.DevkitToolsInventory[i].toolID, 
            ToolType: "Core"}),
          { headers: headers });
          req2.subscribe(
          response => {
          }, error => {
          }
        );
      }
    }, error => {
    }
    );                     
}
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
class Tool implements InventoryMaster{
  toolID: number;
  aquire: string;
  aquireType: string;
  categoryID: number;
  description: string;
  name: string;
  urlRef: string; 
}  