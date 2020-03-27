import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormsModule, FormGroup, FormControl, Validators, AbstractControl,FormControlName} from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error:any;
  constructor(private dataService:DataService, private app:AppComponent) {

    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
   }

  ngOnInit(): void {
  }

  login(){
    {
      this.dataService.login(this.loginForm.value).subscribe(data=>{
        localStorage.setItem('token', data.toString());
        this.app.logged=true;
      },err=>{
        console.log(err);
        if(err.error)
        {
          this.error=err;
        }
        
      });
    }

  }
}
