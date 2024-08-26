import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TerminalCrudService {
  private apiUrl = 'http://localhost:3000/api'; 
  constructor(private http: HttpClient) { }

  //crreate termianl 
  createTerminal(terminal: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createTerminal`, terminal).pipe(
      tap(
        data => console.log(data),
        error => console.error('Error:', error)
      )
    );
  }

  //get terminaltype
  getTerminal(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getTerminal`).pipe(
      tap(
        data => console.log(data),
        error => console.error('Error:', error)
      )
    );
  }


//update terminaltype
  updateTerminal(id_terminal: any,formData: any): Observable<any> {
    
    return this.http.put<any>(`${this.apiUrl}/updateTerminal`, { ...formData, id_terminal }).pipe(
      tap(
        data => console.log('Response:', data),
        error => console.error('Error:', error)
      )
    );
  }

  //delete terminaltype
  deleteTerminal(id_terminal: any,formData:any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteTerminal`,{ params: { id_terminal }}).pipe(
      tap(
        data => console.log(data),
        error => console.error('Error:', error)
      )
    );
  }

}
