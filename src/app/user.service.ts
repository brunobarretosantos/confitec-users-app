import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User, UserRequest } from './user';
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

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: UserRequest): Observable<User> {
    const result = this.http.post<User>(this.apiUrl, user);
    return result;
  }

  public updateUser(user: UserRequest): Observable<User> {
    const result = this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
    return result;
  }
}
