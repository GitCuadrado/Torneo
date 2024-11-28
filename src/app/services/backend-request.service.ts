import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game, Grupo, Usuario} from "../types/types";
import {environment} from "../../environments/environment.development";
import {Auth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class BackendRequestService {

  auth: Auth = inject(Auth)
  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  constructor(private http: HttpClient) {}
  getGrupos(user:string){
    return this.http.get<Grupo[]>(environment.apiUrl + `/grupos/`+user) 
   }
  getPredicciones(user:string){
    
    return this.http.get<Grupo[]>(environment.apiUrl + `/predicciones` + user) 
  }
  GetUsuario(user:string){
    return this.http.get<Usuario>(environment.apiUrl + `/usuario/` + user) 
  }
  ActualizarPrediccion(user:string,idGrupo:string,idOpcion:string){
    return this.http.get<Usuario>(environment.apiUrl + `/actualizarPrediccion/` + user + '/'+idGrupo + "/" + idOpcion) 
  }
}
