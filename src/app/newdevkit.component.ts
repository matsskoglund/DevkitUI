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
    this.selectedTool = this.ToolsInventory[0];
    this.newToolSet.push(this.newAttribute);
    this.newAttribute = {};
  }

  deleteTool(Id:number){
   this.newToolSet.splice(Id-1,1);
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
          this.selectedTool = null;
      }, error => console.error(error));        
    }
    onSelect(idx:number) { 
      for (var i = 0; i < this.toolsLeft.length; i++)
      {        
        if (this.toolsLeft[i].toolID == this.selectedToolId) {
          console.log("Before");
          console.log(this.newToolSet[idx]);   
          this.newToolSet[idx] = this.toolsLeft[i];
           console.log("After");
          console.log(this.newToolSet[idx]);     
        }
      }
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
