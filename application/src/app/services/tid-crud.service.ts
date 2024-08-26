import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TIDCRUDService {
  private apiUrl = 'http://localhost:3000/api'; // Define API URL

  constructor(private http: HttpClient) {}

  createTID(TID_obj: any) {
    return this.http.post<any>(`${this.apiUrl}/createTID`, TID_obj).pipe(
      tap(data => {
        console.log('Create TID successful:', data);
      })
    );
  }


  //get tid 
  getTID(id : any): Observable<any>    {
    return this.http.get<any[]>(`${this.apiUrl}/getTID`, { params: { id } });
  }

  //delete tid
  deleteTID(id_tid : any, id : any) {
    return this.http.delete<any[]>(`${this.apiUrl}/deleteTID`, { params: { id_tid,id } },);
  }


  //update tid
  updateTID(id_tid: any, formData: any): Observable<any> {
     return this.http.put<any>(`${this.apiUrl}/updateTID`, { ...formData, id_tid }).pipe(
      tap(data => {
        console.log('Update TID successful:', data);
      })
    );
  }
}