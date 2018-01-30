import { Component, Input, Inject ,ViewEncapsulation } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';  
import {ActivatedRoute} from "@angular/router";
import { environment } from '../environments/environment';

@Component({
  selector: 'newdevkit',
  templateUrl: './newdevkit.component.html'
})

export class NewDevkitComponent {  
  public sDescription = "";
  public sShortName = "";
  public sName = "";
  public sDesigner = "";
  public ToolsInventory: ToolsMaster[] = [];
  public newToolSet: ToolsMaster[] = [];
  public toolsLeft: ToolsMaster[] = [];
  public selectedTool:Tool; 
  public newTool:boolean = false;
  bseUrl:string;
  public Devkit: DevkitMaster[] = [];
  public selectedToolId: number;
  private newAttribute: any = {};

  constructor(public http: Http)   
  {
    this.bseUrl = environment.apiUrl; 
    this.getToolsData();   
  }

  submitted = false;
  onSubmit(devkit:any) { 
    this.submitted = true; 
    console.log("Submitted");
    console.log(devkit);
  }
  getDevKitData(devkitid: number) {
    this.http.get(this.bseUrl + 'api/Devkits/' + devkitid).subscribe(result => {
        this.Devkit = result.json();
    }, error => console.error(error));        
  }
  addTool(){
    this.newTool = true;

    this.selectedTool = {  toolID: 0,
      name: "",
      description: "",
      aquire: "",
      urlRef: "",
      aquireType: "",
      taken: false,
     idx: 0};
  }

  deleteTool(Id:number){
   this.newToolSet.splice(Id,1);
   this.toolsLeft.push(this.ToolsInventory[Id]);
  }

  addDevkit(sname:string, devkitName: string, devkitDescription: string, designer: string ) {
    console.log("addDevKit");
    console.log(sname);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    this.http.post(this.bseUrl + 'api/Devkits/', JSON.stringify({ shortName: sname, name: devkitName, description: devkitDescription, email: designer}),
            { headers: headers }).subscribe(
            response => {
                this.getDevKitData(1);

            }, error => {
            }
            );
    }

    getToolsData() {
      this.http.get(this.bseUrl + 'api/Tools/').subscribe(result => {
          this.ToolsInventory = result.json();
          this.toolsLeft = result.json();
      
      }, error => console.error(error));        
    }
    onSelect(idx:number) { 
      console.log(idx);
      for (var i = 0; i < this.toolsLeft.length; i++)
      {        
        if (this.toolsLeft[i].toolID == this.selectedToolId) {
          console.log(this.toolsLeft[i].toolID);
          this.selectedTool = this.toolsLeft[i];
          
        }
      }
    }
    addNewTool(){
      this.newToolSet.push(this.selectedTool); 
      this.toolsLeft.splice(this.selectedTool.toolID - 1,1);
    }

    

}


export interface DevkitMaster {
  devkitID: number;
  shortName:string;
  name: string;
  description: string;
  email: string;
}  

export interface ToolsMaster {
  toolID: number;
  name: string;
  description: string;
  aquire: string;
  urlRef: string;
  aquireType: string;
  taken:boolean;
  idx: number;
}  

class Tool implements ToolsMaster{
  toolID: number;
  name: string;
  description: string;
  aquire: string;
  urlRef: string;
  aquireType: string;
  taken: boolean;
 idx: number;
}  
