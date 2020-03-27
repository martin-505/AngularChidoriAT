import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { DataService } from './services/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  logged:boolean;

  constructor(private dataService:DataService) {
    this.session();

  }

session(){
  this.dataService.getUserName().subscribe((resultado)=>{
    this.logged=true;
  },(err)=>{
    this.logged=false;
  }); 
 }
}