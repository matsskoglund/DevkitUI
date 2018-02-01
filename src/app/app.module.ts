import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DevkitComponent } from './devkit.component';
import { NewDevkitComponent} from './newdevkit.component';
import { ToolsComponent} from './tools.component';
import { ModifyDevkitComponent} from './modifydevkit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DevkitComponent,
    NewDevkitComponent,
    ToolsComponent,
    ModifyDevkitComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,    
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'create', component: NewDevkitComponent },
      { path: 'devkit/:id', component: DevkitComponent },  
      { path: 'modify/:id', component: ModifyDevkitComponent }, 
      { path: 'tools', component: ToolsComponent }   
      //{ path: '**', redirectTo: 'home' }
  ])
  ],
  providers: [ 
    { provide: 'BASE_URL', useFactory: getBaseUrl }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}