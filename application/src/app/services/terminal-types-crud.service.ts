import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerminalTypesCrudService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  // get all terminal types
  getTerminalTypes(): Observable<any[]> {
         return this.http.get<any>(`${this.apiUrl}/getTerminalTypes`);

  }

  // Create terminal type
  createTerminalType(terminalTypeData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createTerminalType`, terminalTypeData);
 
  }

  // Update   terminal type
  updateTerminalType(id_terminalType: number, terminalTypeData: any): Observable<any> {
     return this.http.put<any>(`${this.apiUrl}/updateTerminalType`, { ...terminalTypeData, id_terminalType })
      
  }

  

  // Delete   terminal type
  deleteTerminalType(id_terminalType: number): Observable<any> {
     return this.http.delete<any>(`${this.apiUrl}/deleteTerminalType`,{ params: { id_terminalType }}) 
  } 
}
