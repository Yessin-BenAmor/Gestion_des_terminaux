import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string | null;
  constructor(private router: Router, private authService: AuthService) {
    this.username = localStorage.getItem('usernameValuemlsignin');
   }
  navigate() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile', this.username]);
    } else {
      this.router.navigate(['/signIn']);
    }
  }
}
