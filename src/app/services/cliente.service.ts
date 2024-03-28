import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private refresh$ = new Subject<void>
  private url ="https://beautyapi-9rry.onrender.com/api/clientes/"
  private url2 ="https://beautyapi-9rry.onrender.com/api/clientes/estado/"
  constructor(private http: HttpClient) { }


  get refresh(){
    return this.refresh$;
  }
  getCliente(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url)
  }

  createCliente(body:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, body)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }
  actualizarCliente(id:number, body:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url + id, body);
  }

  getOneCliente(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(this.url + id)
  }

  eliminarCliente(id:string):Observable<Cliente>{
    return this.http.delete<Cliente>(this.url+id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      }))
  }

  actulizarEstado(id:string):Observable<Cliente>{
    return this.http.get<Cliente>(this.url2+id)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }
}
