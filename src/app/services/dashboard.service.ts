import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ServiciosDashboard } from '../interfaces/dashboard.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private refresh$ = new Subject<void>
  private url="https://beautyapi-9rry.onrender.com/api/servicios-utilizados"
  private url2="https://beautyapi-9rry.onrender.com/api/citas-por-dia"


  constructor(private http:HttpClient) { }

  get refresh(){
    return this.refresh$;
  }


  getServiciosUtilizados(startDate:string, endDate:string):Observable<ServiciosDashboard>{
    const params = { startDate, endDate };
    return this.http.get<ServiciosDashboard>(this.url, { params })   
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )
  }

  getCitasPorDia(startDate:string, endDate:string):Observable<any>{
    const params = { startDate, endDate };
    return this.http.get<any>(this.url2, { params })   
    .pipe(
      tap(()=>{
        this.refresh$.next();
      })

      )

  }


}
