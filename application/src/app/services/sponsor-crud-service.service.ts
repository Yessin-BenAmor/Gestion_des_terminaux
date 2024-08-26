import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SponsorCrudService {

  private baseUrl = 'http://localhost:3000/api';  

  constructor(private http: HttpClient) { }

  // Get all sponsors
  getSponsors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getSponsors`);
  }

  // Get a sponsor by ID
  getSponsorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getSponsor`,{ params: { id }});
  }

  // Create a new sponsor
  createSponsor(sponsor: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/createSponsor`, sponsor);
  }

  // Update a  sponsor
  updateSponsor(id_sponsor: number, formData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateSponsor`,  {  ...formData,id_sponsor });
  }

  // Delete   sponsor
  deleteSponsor(id_sponsor: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteSponsor`,{ params: { id_sponsor }});
  }
}
