import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:5034/api/usuarios'; // Atualize com o endereço da sua API

  constructor(private http: HttpClient) {}

  getUsuarios() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
