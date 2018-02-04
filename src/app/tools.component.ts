import { Component, Input, Inject  } from '@angular/core';
import { Http, Response,  RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';  
import { environment } from '../environments/environment';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'home',
  templateUrl: './tools.component.html'
})
export class ToolsComponent {
  title = 'Tools';
  public ToolsInventory: ToolsMaster[] = [];
  public bseUrl: string = ""; 
  public editMode:boolean = false;
  public newTool: ToolsMaster = {
    toolID: 0,
    aquire: "",
    aquireType: "",
    description: "",
    name: "",
    urlRef: ""
  };

  public aquire: string;
  public aquireType: string;
  public description:string;
  public name: string;
  public urlRef: string;

  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.bseUrl = environment.apiUrl;
    this.getToolsData();
  }

  getToolsData() {
    this.http.get<ToolsMaster[]>(this.bseUrl + 'api/Tools/').subscribe(result => {
        this.ToolsInventory = result;
    }, error => console.error(error));        
  }

  edit(){
    this.editMode =true;   
  }
  addNewTool()
  {
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     var req = this.http.post<ToolsMaster>(this.bseUrl + 'api/tools/', JSON.stringify({ 
      Name: this.newTool.name, URLRef: this.newTool.urlRef, Description: this.newTool.description, Aquire: this.newTool.aquire, AquireType: this.newTool.aquireType

   }),
            { headers: headers });
            req.subscribe(
              response => {
                this.newTool = response;
                this.ToolsInventory.push(this.newTool);
                this.newTool = {
                  toolID: 0,
                  aquire: "",
                  aquireType: "",
                  description: "",
                  name: "",
                  urlRef: ""
               };
              }, error => {
              }
              );        
      

    }
  deleteTool(toolid: number)
  {
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    const req = this.http.delete(this.bseUrl + 'api/tools/'+ toolid,
    { headers: headers });

    req.subscribe(devk => {
      for( var j=0; j<this.ToolsInventory.length; j++){
        if(this.ToolsInventory[j].toolID == toolid){
         this.ToolsInventory.splice(j, 1);
       }
     }      
    });       
  }
}

export interface ToolsMaster {
  toolID: number;
  name: string;
  description: string;
  aquire: string;
  urlRef: string;
  aquireType: string;
}  
