  import { Component } from '@angular/core';
  import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { AuthService } from '../services/auth.service';
  import { HttpClientModule,provideHttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
  // Custom validator to check that two fields match
  export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  @Component({
    selector: 'app-sign-up',
    standalone: true,
    providers: [AuthService,], 
    imports: [ReactiveFormsModule,RouterLink, HttpClientModule, CommonModule], 
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'] //
  })
  export class SignUpComponent {
    submitted = false;
    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService,private router : Router) {
      this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        id_team: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {
        validators: MustMatch('password', 'confirmPassword') // Add the custom validator here
      });
    }

    onSubmit() {
      this.submitted = false;
      console.log(this.registerForm.value);
      if (this.registerForm.invalid) {
        alert('Form is invalid. Please fill out all required fields correctly.');
        return;
      }

      const { username, id_team, password } = this.registerForm.value;

      this.authService.signup(username, id_team, password).subscribe(
        data => {
          alert('Registration successful!');
          console.log(data);
          this.registerForm.reset();
          this.submitted = true;
          this.router.navigate(['/signIn']);
        },
        error => {
          alert('Registration failed. Please try again.');
          console.error(error);
        }
      );
    }
  }
