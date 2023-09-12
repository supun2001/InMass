import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username:string='';
  password:string='';
  faild:boolean = false;

  constructor(private router:Router){}

  login(){
    if(this.username=="admin" && this.password=="admin"){
      localStorage.setItem('token',Math.random().toString());
      this.router.navigate(['/dashboard'])
    }else{
      this.faild=true;
      console.log("error")
    }
  }

}
