import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';  // Asegúrate de instalar el paquete: npm install @auth0/angular-jwt
import { Router, NavigationEnd } from '@angular/router';  // Importa NavigationEnd
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private refresh$ = new Subject<void>
  private jwtHelper = new JwtHelperService();
  private userRoles: string[] = [];
  // private rolesSubject = new Subject<string[]>();

  private rolesSubject = new BehaviorSubject<string[]>([]);


  constructor(private http: HttpClient, private router: Router) {
    // Suscribe al evento NavigationEnd para actualizar los roles al cambiar de ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadUserRoles();
      }
    });
  }

  private loginUrl = "https://beautyapi-9rry.onrender.com/login"
  private registerUrl = "https://beautyapi-9rry.onrender.com/register";
  private forgot = 'https://beautyapi-9rry.onrender.com/forgot-password';
  private actualizacionContrasena = "https://beautyapi-9rry.onrender.com/cambio/";


  login(email: string, contrasena: string): Observable<any> {
    const body = { email, contrasena };
    return this.http.post(this.loginUrl, body)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }
  // Nuevo método para obtener la información del usuario y sus roles desde el token
  getUserInfo(): { _id: string, roles: string[] } | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);

      return decodedToken;
    }
    return null;
  }

  private loadUserRoles(): void {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      this.userRoles = userInfo.roles; // Asegúrate de que esto es un array de strings
      this.rolesSubject.next(this.userRoles); // Notificar cambios a los suscriptores
    }
  }

  // Nuevo método para obtener los roles del usuario como un observable
  getRolesObservable(): Observable<string[]> {
    return this.rolesSubject.asObservable();
  }

  getUserRoles(): string[] {
    return this.userRoles;
  }



  //logica del guard para proteccion de directivas, los guards siempre reciben booleanos
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token')
  }

  get refresh() {
    return this.refresh$;
  }
  //Me permite enviarle un email a la persona
  existeEmail(body: any) {
    return this.http.post(this.forgot, body)
      .pipe(
        tap(() => {
          this.refresh$.next();
        }),
      )
  }

  enviarNuevaContrasena(id: string, token: string, body: any) {
    return this.http.put(this.actualizacionContrasena + id + `/` + token, body)
  }
}
