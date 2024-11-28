import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'pickem-login-form',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, FontAwesomeModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Input("loginError")
  loginError: string | null = null;
  auth: Auth = inject(Auth);
  router: Router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  })

  protected readonly faGoogle = faGoogle;

  onLoginSubmit(form: FormGroup) {
    this.loginError = null;
    if(form.valid) {
      signInWithEmailAndPassword(this.auth, form.value.email, form.value.password)
        .then(userCredential => {
          console.log(userCredential.user.displayName);
          this.router.navigate([""]);
        })
        .catch(error => {
          console.log(error)
          this.loginError = "Something went wrong. You might already have an account via Google."
        });
    } else {
      this.loginError = "Resolve all errors first before logging in."
    }
  }

  onGoogleLogin() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(userCredential => {
        this.router.navigate([""]);
      })
      .catch(error => console.log(error));
  }

}
