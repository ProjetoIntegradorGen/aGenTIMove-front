import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token),
  };

  refreshToken(){
    this.token={
      headers: new HttpHeaders().set("Authorization", environment.token),
    };
}

    login(userLogin: UserLogin): Observable<UserLogin>{
      return this.http.post<UserLogin>('https://agentimove.herokuapp.com/usuarios/logar', userLogin)
    }

    cadastro(usuario: Usuario): Observable<Usuario>{
      return this.http.post<Usuario>('https://agentimove.herokuapp.com/usuarios/cadastrar', usuario)
    }

    logado(){
      let ok: boolean = false
      if(environment.token != ''){
        ok=true
      }
      return ok
    }

    admin(){
      let ok: boolean = false
      if(environment.tipo == 'admin'){
        ok = true
      }
      return ok
    }

    userId() {
      let id: number = 0
      if (environment.id != 0){
        id = environment.id
      }
      return id
    }

    atualizar(usuario: Usuario): Observable<Usuario>{
      return this.http.put<Usuario>('https://agentimove.herokuapp.com/usuarios', usuario, this.token)
    }

    getByIdUsuario(id: number): Observable<Usuario>{
      return this.http.get<Usuario>(`https://agentimove.herokuapp.com/usuarios/${id}`, this.token)
    }

  }





