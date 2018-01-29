import { Component, Input, Inject  } from '@angular/core';
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
  public selectedTool:ToolsMaster; 

  bseUrl:string;
  public Devkit: DevkitMaster[] = [];

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
          this.selectedTool = null;
      }, error => console.error(error));        
    }
    onSelect(toolId) { 
      this.selectedTool = null;
      for (var i = 0; i < this.ToolsInventory.length; i++)
      {        
        console.log(this.ToolsInventory[i].toolID);
        if (this.ToolsInventory[i].toolID == toolId) {
          console.log("Found");
          this.selectedTool = this.ToolsInventory[i];          
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
}  