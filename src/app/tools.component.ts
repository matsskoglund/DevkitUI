import { Component, Input, Inject  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';  
import { environment } from '../environments/environment';

@Component({
  selector: 'home',
  templateUrl: './tools.component.html'
})
export class ToolsComponent {
  title = 'Tools';
  public ToolsInventory: ToolsMaster[] = [];
  public bseUrl: string = ""; 

  constructor(public http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.bseUrl = environment.apiUrl;
    this.getToolsData();
  }

  getToolsData() {
    this.http.get(this.bseUrl + 'api/Tools/').subscribe(result => {
        this.ToolsInventory = result.json();
    }, error => console.error(error));        
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
