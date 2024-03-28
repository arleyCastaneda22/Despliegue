import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Servicio } from '../interfaces/servicios.interfaces';
import { Estilista } from '../interfaces/estilista.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private refresh$ = new Subject<void>
  constructor(private http:HttpClient) { }

  private url = 'https://beautyapi-9rry.onrender.com/api/servicios/'
  private url2 ='https://beautyapi-9rry.onrender.com/api/servicios/estado/'

  get refresh(){
    return this.refresh$;
  }

  getServicios():Observable<Servicio[]>{
    return this.http.get<Servicio[]>(this.url)

  }

  getOneServicio(id:string):Observable<Servicio>{
    return this.http.get<Servicio>(this.url + id)
  }

  getEstilistaSeleccionado(id:string):Observable<Estilista[]>{
    return this.http.get<Estilista[]>(this.url + id + '/estilista');
  }

  
  createServicio(body:Servicio):Observable<Servicio>{
    return this.http.post<Servicio>(this.url, body)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }


  eliminarServicio(id:string):Observable<Servicio>{
    return this.http.delete<Servicio>(this.url+id)   
     .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }

  actualizarServicio(id:string, body:Servicio):Observable<Servicio>{
    return this.http.put<Servicio>(this.url + id, body);
  }

  actualizarEstado(id:string):Observable<Servicio>{
    return this.http.get<Servicio>(this.url2 + id) 
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }

}
