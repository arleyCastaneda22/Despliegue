import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private refresh$ = new Subject<void>();
  private apiUrl = "https://beautyapi-9rry.onrender.com/api/usuarios/";
  private url2 = "https://beautyapi-9rry.onrender.com/api/usuarios/estado/";

  constructor(private http: HttpClient) { }

  get refresh() {
    return this.refresh$;
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  createUsuario(body: Usuario): Observable<Usuario> {
    console.log('Body antes de enviar:', body);
    return this.http.post<Usuario>(this.apiUrl, body)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      );
  }

  actualizarUsuario(id: string, body: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}${id}`, body);
  }

  getOneUsuario(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}${id}`);
  }

  EliminarUsuario(id: string): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.apiUrl}${id}`)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      );
  }

  actulizarEstado(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url2}${id}`)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      );
  }

  actualizarContraseña(id: string, oldcontrasena: string, newcontrasena: string): Observable<any> {
    const body = { oldcontrasena, newcontrasena };
   return this.http.put(`${this.apiUrl}contrasena/${id}`, body);
  }

}
