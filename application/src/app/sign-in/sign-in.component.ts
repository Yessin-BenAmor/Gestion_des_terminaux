import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  providers: [AuthService], 
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, SignUpComponent, RouterOutlet, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'] // Corrected from styleUrl to styleUrls
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router : Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Login is invalid. Please fill out all required fields correctly.');
      return;
    }
  
    const { username, password } = this.loginForm.value;
  
    this.authService.signin(username, password).subscribe(
      (data: any) => {
         alert('Login successful');
        localStorage.setItem('usernameValuemlsignin', username);
        const storedUsername = localStorage.getItem('usernameValuemlsignin');
        const id = localStorage.setItem('id',data.userId); 
        this.router.navigate(['/profile', storedUsername]);
      },
      (error: any) => {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      }    
    );
  }
}