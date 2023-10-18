import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers() {
    const result = this.http.get<any[]>(`${this.apiUrl}`);
    console.log('result', result)
    return result;
  }
}
