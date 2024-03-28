import { Injectable } from '@angular/core';
import { Estilista } from '../interfaces/estilista.interfaces';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstilistaService {

  private refresh$ = new Subject<void>
  private url ="https://beautyapi-9rry.onrender.com/api/estilistas/"
  private url2 ="https://beautyapi-9rry.onrender.com/api/estilistas/estado/"

  constructor(private http: HttpClient) { }


  get refresh(){
    return this.refresh$;
  }
  getEstilistas(): Observable<Estilista[]>{
    return this.http.get<Estilista[]>(this.url)
  }

  createEstilista(body: Estilista): Observable<Estilista> {
    return this.http.post<Estilista>(this.url, body)
      .pipe(
        tap(() => {
          this.refresh$.next();
        }),

      );
  }
  actualizarEstilista(id:string, body:Estilista):Observable<Estilista>{
    return this.http.put<Estilista>(this.url + id, body);
  }

  getOneEstilista(id:string):Observable<Estilista>{
    return this.http.get<Estilista>(this.url + id)
  }
  EliminarEstilista(id:string):Observable<Estilista>{
    return this.http.delete<Estilista>(this.url + id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }
  actulizarEstado(id:string):Observable<Estilista>{
    return this.http.get<Estilista>(this.url2+id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }


  actualizarContraseña(id: string, oldcontrasena: string, newcontrasena: string): Observable<any> {
    const body = { oldcontrasena, newcontrasena };
    return this.http.put(`${this.url}contrasena/${id}`, body);
  }


}
