import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, AbstractControl,FormControlName} from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  FormRegistro: FormGroup;
  error:any;
  error2:any;
  @ViewChild('modalRegistro') public modal: ElementRef;

  constructor(private dataService:DataService,private render:Renderer2) { 

    this.FormRegistro = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      rol: new FormControl(null, Validators.required),
      profileImg: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });


  }

  ngOnInit(): void {
  }

  register(){
    if(this.FormRegistro.valid){
    this.dataService.submitRegister(this.FormRegistro.value).subscribe((res) => {
      console.log(res);
      this.render.selectRootElement(this.modal.nativeElement, true).click();
      this.FormRegistro.reset();
    },(err)=>{
      console.log(err);
      if(err.error){
        this.error=err;
      }
      if(err.error.err){
        this.error2=err;
      }
    }
    );
  }
}

}
