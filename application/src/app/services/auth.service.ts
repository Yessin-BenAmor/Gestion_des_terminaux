import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient,private router : Router) {
    if (this.isLoggedIn()==true) {
      console.log('User is logged in');
    }
    }

  signup(username: string, id_team: string,  password: string): Observable<any> {
    const body = { username, id_team, password };
    return this.http.post<any>(`${this.apiUrl}/signUp`, body).pipe(
      tap(data => {
        
        console.log('Signup successful:', data);
      })
    );
  }
  localStorage : any 

  signin(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/signIn`, body).pipe(
      tap(data => {
        localStorage.setItem('currentUser', JSON.stringify({ username}));

        localStorage.setItem('token', data.token);
      }),
      );
  }

 
   signout(): any {
    // Remove token ml localStorage  
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usernameValuemlsignin');
    localStorage.removeItem('currentUser');
    console.log(localStorage.getItem('token')); 
  }

  getID(): string | null {
    const id = localStorage.getItem('id');
    if (id) {
       return id;
    } else {
      console.error('No ID found in localStorage');
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
