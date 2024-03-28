import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Citas } from '../interfaces/cita.interfaces';


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private refresh$ = new Subject<void>();
  private apiUrl = "https://beautyapi-9rry.onrender.com/api/citas/";

  constructor(private http: HttpClient) { }

  get refresh() {
    return this.refresh$;
  }

  getCitas(): Observable <Citas[]>{
    return this.http.get<Citas[]>(this.apiUrl);
  }

  getCitaById(id: string): Observable<Citas> {
    return this.http.get<Citas>(`${this.apiUrl}${id}`);
  }

  createCita(body: Citas): Observable<Citas> {
    console.log('Body antes de enviar:', body);
    return this.http.post<Citas>(this.apiUrl, body)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      );
  }

  updateCita(id: string, body: Citas): Observable<Citas> {
    return this.http.put<Citas>(`${this.apiUrl}${id}`, body);
  }

  eliminarCita(id: string): Observable<Citas> {
    return this.http.delete<Citas>(`${this.apiUrl}${id}`)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      );
  }







}
