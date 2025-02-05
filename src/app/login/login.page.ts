import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string='';
  constructor() { }

  ngOnInit() {
  }
  
ingresar(){
  // if(this.email === 'admin'
     //&& this.password === 'admin'){
     //console.log('Login correcto');
   //}
   //else {
     //console.log('Login incorrecto');
   
     //}
   }

}
