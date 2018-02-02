import { Component, Input, Inject  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';  
import {ActivatedRoute} from "@angular/router";
import { environment } from '../environments/environment';

@Component({
  selector: 'devkit',
  templateUrl: './modifydevkit.component.html'
 
})
export class ModifyDevkitComponent {
  title = 'Devkit';
  public editMode: boolean = false;
  public ToolsInventory: InventoryMaster[] = [];
  public DevkitToolsInventory: InventoryMaster[] = [];
  public toolsLeft: InventoryMaster[] = [];
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
  public selectedToolId: number;
  public selectedTool:Tool; 
  constructor(public http: Http, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute) {
    this.myName = "Devkit"; 
    this.bseUrl = environment.apiUrl;
    this.route.params.subscribe( params => 
      {
        this.getDevkitTools(params['id']);
        this.getDevKitData(params['id']);   
        this.getAllTools();       
      }
    );
  }

  edit(){
      this.editMode =true;
   
      
      this.updateToolsLeft();
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
    
;
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
  }

  cancel()
  {
//    this.editMode = false; 
  }

  deleteDevkitTool(Id:number)
  {    
    var obj = this.DevkitToolsInventory.splice(Id,1);
    this.toolsLeft.push(obj[0]);

  }
  /*getData(devkitid: number) {
    this.http.get(this.bseUrl + 'api/Devkits/tools/' + devkitid).subscribe(result => {
        this.ToolsInventory = result.json();
        
    }, error => console.error(error));        
  }*/

  getDevkitTools(devkitid: number) {
    this.http.get(this.bseUrl + 'api/Devkits/tools/' + devkitid).subscribe(result => {
        this.DevkitToolsInventory = result.json();
        
    }, error => console.error(error));        
  }
  getAllTools() {
    this.http.get(this.bseUrl + 'api/Tools/').subscribe(result => {
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
class Tool implements InventoryMaster{
  toolID: number;
  aquire: string;
  aquireType: string;
  categoryID: number;
  description: string;
  name: string;
  urlRef: string; 
}  