import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserNew } from './user-new.model';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrls: ['./signup-screen.component.css']
})
export class SignupScreenComponent implements OnInit {
  hide = true;
  // crea un object
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
        password: new FormControl(null, Validators.required),
        passwordSegurity: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
        const { firstName, lastName, email, password, passwordSegurity } = this.signupForm.value;
      if (password === passwordSegurity) {
        const userNew = new UserNew(firstName, lastName, email, password, passwordSegurity);
        console.log(userNew);
      } 
    }
  }
}
