import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, tap } from 'rxjs';
import { Citas } from '../interfaces/cita.interfaces';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private refresh$ = new Subject<void>
  constructor(private http:HttpClient) { }

  private url = "https://beautyapi-9rry.onrender.com/api/citas/";
  private url2="https://beautyapi-9rry.onrender.com/api/citas/";


  get refresh(){
    return this.refresh$;
  }

  getCita():Observable<Citas[]>{
    return this.http.get<Citas[]>(this.url);
  }

  createCitas(body:Citas): Observable<Citas>{
    return this.http.post<Citas>(this.url, body)
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }


  actualizarEstado(id: string, nuevoEstado: string): Observable<Citas> {
    return this.http.put<Citas>(`${this.url}estado/${id}`, { estado: nuevoEstado })
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      );
  }

  getCitaPorEstilista(estilistaId: string): Observable<Citas[]> {
    if (!estilistaId) {
      console.error('EstilistaId no definido');
      return EMPTY;
    }
    const urlPorEstilista = `${this.url}${estilistaId}/citas`;

    return this.http.get<Citas[]>(urlPorEstilista).pipe(
      
      catchError((error) => {
        console.error('Error al obtener citas por estilista:', error);
        // Puedes manejar el error según tus necesidades
        return EMPTY;
      })
    );
  }

  getOneCita(id: string): Observable<Citas> {
    return this.http.get<Citas>(`${this.url}${id}`);
  }


  actualizarCita(id: string, body: Citas): Observable<Citas> {
    return this.http.put<Citas>(`${this.url}${id}`, body);
  }


  EliminarCita(id: string): Observable<Citas> {
    return this.http.delete<Citas>(`${this.url}${id}`)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      );
  }

  getByEstilistaId(id:string):Observable<Citas[]>{
    return this.http.get<Citas[]>(`${this.url2}${id}/citas`)
     .pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }

  getByClienteId(id:string):Observable<Citas[]>{
    return this.http.get<Citas[]>(`${this.url2}${id}/citas1`)
  }
}
