import { Component, OnInit } from '@angular/core';
import { User } from '../user';

import {Router} from '@angular/router';

//http
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit() {
    this.timerID = setInterval(() => {
      console.log("regist compp timeeeeer")
    }, 5000);
  }
  timerID;

  user: User={
    userName:"",
    email:"",
    password:"",
    age:null
    
  };


  onSubmit(): void {
  
    this.http.
    post("http://localhost:3000/api/create_user",this.user).
    subscribe(
      data  => {
      console.log("POST Request is successful ", data);
      this.router.navigate(["/login"],{queryParams: {_id:1234, userName:"Vignesh"}});
      },
      error  => {

      console.log("Error", error);

      });
  }

  ngOnDestroy() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }

}
