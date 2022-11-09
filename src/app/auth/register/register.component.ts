import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) {
    this.registerForm = this.createRegisterForm();
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['main'])
    }
  }

  createRegisterForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    })
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.authService.register( {
      email: this.registerForm.value.email,
      username: this.registerForm.value.email,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
    }).subscribe(data => {
      console.log(data);

      // this.tokenStorage.saveToken(data.token);
      // this.tokenStorage.saveUser(data);

      this.notificationService.showSnackBar('Successfully registered in');
      this.router.navigate(['/'])
      window.location.reload()
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error.message)
    })
  }

}
