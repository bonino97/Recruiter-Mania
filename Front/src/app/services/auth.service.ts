
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public IsAuthenticated() : Boolean {
    let cookie = localStorage.getItem('lemon-cookie')
    if(cookie && JSON.parse(cookie)){
      return true;
    }
    return false;
  }

  public SetUserInfo(lemonCookie){
    localStorage.setItem('lemon-cookie', JSON.stringify(lemonCookie));
  }

  public ClearStorage(){
    localStorage.removeItem('lemon-cookie');
    localStorage.clear();
  }

}
