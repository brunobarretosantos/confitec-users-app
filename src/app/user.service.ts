import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers() {
    const result = this.http.get<User[]>(`${this.apiUrl}`);
    return result;
  }

  addUser(user: User): Observable<User> {
    const result = this.http.post<User>(this.apiUrl, user);
    console.log('postresult', result)
    return result;
  }
}
