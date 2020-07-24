
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public IsAuthenticated() : Boolean {
    let userData = localStorage.getItem('lemon-cookie')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public SetUserInfo(user){
    localStorage.setItem('lemon-cookie', JSON.stringify(user));
  }

}
