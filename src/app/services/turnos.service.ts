import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ITurnos } from '../interfaces/turnos.interfaces';


@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private refresh$ = new Subject<void>

  constructor(private http: HttpClient) { }

  private url = "https://beautyapi-9rry.onrender.com/api/turnos"
  private url2 = "https://beautyapi-9rry.onrender.com/api/turnos/estado/"
  private url3 = "https://beautyapi-9rry.onrender.com/api/turnos/edit/"
  getTurnos(id: string): Observable<ITurnos[]> {
    return this.http.get<ITurnos[]>(`${this.url}/${id}`).pipe(
      tap(() => {
        this.refresh$.next();
      })
    );
  }




  createTurnos(body: ITurnos | ITurnos[]): Observable<ITurnos | ITurnos[]> {
    return this.http.post<ITurnos | ITurnos[]>(this.url, body);
  }

  actulizarEstado(id: string): Observable<ITurnos> {
    return this.http.get<ITurnos>(this.url2 + id)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })

      )
  }

  actualizarTurno(id: string, body: ITurnos): Observable<ITurnos> {
    return this.http.put<ITurnos>(`${this.url}/${id}`, body);
  }

  getOneTurno(id: string): Observable<ITurnos> {
    return this.http.get<ITurnos>(this.url3 + id)
  }


  getOneTurnoIndividual(id: string): Observable<ITurnos[]> {
    return this.http.get<ITurnos[]>(`${this.url}/${id}`)
  }







}