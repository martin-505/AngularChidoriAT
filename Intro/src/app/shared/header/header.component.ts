import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any;
  constructor(private dataService:DataService,private app:AppComponent) { }

  ngOnInit(): void {
    this.session();
  }
  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }

  session(){
    this.dataService.getUserName().subscribe((resultado)=>{
      this.user=resultado;
      console.log(resultado);
      console.log('si');
    },(err)=>{
      console.log(err);
      console.log('no10');
    }); 
   }


  }


