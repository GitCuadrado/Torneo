import {Component, inject, Input} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "@angular/fire/auth";
import {Router} from "@angular/router";
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
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.value.password;
  const confirmed = control.value.confirmPassword;
  return password && confirmed && password !== confirmed ? {confirmPassword: true} : null;
}

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(control.value)
  return isValid ? null : { password: {value: control.value}};
}

@Component({
  selector: 'pickem-register-form',
  templateUrl: './register-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    FontAwesomeModule,
    MatButtonModule,
    NgIf
  ],
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  @Input("registrationError")
  registrationError: string | null = null;
  auth: Auth = inject(Auth);
  router: Router = inject(Router);

  registerForm = new FormGroup({
    displayName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, passwordValidator]),
    confirmPassword: new FormControl("", [Validators.required])
  }, {validators: [passwordMatchValidator]})

  onSubmit(form: FormGroup) {
    this.registrationError = null;
    if(form.valid) {
      createUserWithEmailAndPassword(this.auth, form.value.email, form.value.password)
        .then(cred => {
          const user = cred.user;
          updateProfile(user, {displayName: form.value.displayName})
            .then(r => this.router.navigate(["/"]))
        }).catch(error => {
          console.log(error);
          this.registrationError = "Something went wrong. You might be logged in already, or something else happened."
      })
    } else {
      this.registrationError = "Resolve all errors and then try registering again."
    }
  }

  onGoogleRegister() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(r => this.router.navigate(["/"]))
      .catch(error => console.log(error));
  }

  protected readonly faGoogle = faGoogle;
}
