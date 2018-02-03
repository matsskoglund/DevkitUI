import { Component, Input, Inject ,ViewEncapsulation } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';  
import {ActivatedRoute} from "@angular/router";
import { environment } from '../environments/environment';
import { forEach } from '@angular/router/src/utils/collection';

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
  }
  getDevKitData(devkitid: number) {
    this.http.get(this.bseUrl + 'api/Devkits/' + devkitid).subscribe(result => {
        this.Devkit = result.json();
    }, error => console.error(error));        
  }

  deleteTool(Id:number){
    var obj = this.newToolSet.splice(Id,1);
    this.toolsLeft.push(obj[0]);
  }

  addDevkit(sname:string, devkitName: string, devkitDescription: string, designer: string ) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    var theDevkit:DevkitMaster;
    const req = this.http.post(this.bseUrl + 'api/Devkits/', JSON.stringify({ shortName: sname, name: devkitName, description: devkitDescription, email: designer}),
            { headers: headers });
    req.subscribe(
            response => {
              theDevkit = response.json();
  
                for (var i = 0, len = this.newToolSet.length; i < len; i++) {                         
                  var req2 = this.http.post(this.bseUrl + 'api/Devkits/tools/', JSON.stringify({ DevkitID: theDevkit.devkitID, ToolId: this.newToolSet[i].toolID, ToolType: "Core"}),
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

    getToolsData() {
      this.http.get(this.bseUrl + 'api/Tools/').subscribe(result => {
          this.ToolsInventory = result.json();
          this.toolsLeft = result.json();
      
      }, error => console.error(error));        
    }
    onSelect(idx:number) { 
     
      for (var i = 0; i < this.toolsLeft.length; i++)
      {        
        if (this.toolsLeft[i].toolID == this.selectedToolId) {
          this.selectedTool = this.toolsLeft[i];
          
        }
      }
    }
    addNewTool(){
      this.newToolSet.push(this.selectedTool); 
      var idx = this.toolsLeft.indexOf(this.selectedTool);

      var obj = this.toolsLeft.splice(idx,1);
      this.selectedTool = null;
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
