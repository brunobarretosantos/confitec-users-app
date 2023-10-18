import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User, UserRequest } from './user';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private userDeletedSubject = new Subject<number>();

  userDeleted$ = this.userDeletedSubject.asObservable();

  constructor(private http: HttpClient) { }

  public getUsers() {
    const result = this.http.get<User[]>(`${this.apiUrl}`);
    return result;
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  public addUser(user: UserRequest): Observable<User> {
    const result = this.http.post<User>(this.apiUrl, user);
    return result;
  }

  public updateUser(user: UserRequest): Observable<User> {
    const result = this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
    return result;
  }

  public deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.userDeletedSubject.next(id);
      })
    );
  }
}
