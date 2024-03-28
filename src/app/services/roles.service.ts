import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Role } from '../interfaces/role.interfaces';


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private refresh$ = new Subject<void>
  private url ="https://beautyapi-9rry.onrender.com/api/roles/"

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(this.url)
  }


getOneRole(id:string):Observable<Role>{
  return this.http.get<Role>(this.url + id)
}







}
