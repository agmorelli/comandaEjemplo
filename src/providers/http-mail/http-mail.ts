import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpMailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpMailProvider {

  url= "https://us-central1-practicaprofesional-dbd4e.cloudfunctions.net/sendMail?dest="
  constructor(public http: HttpClient) {
    console.log('Hello HttpMailProvider Provider');
  }

  EnviarMail(mail: string, id:string)
  {
    let direccion= this.url+mail+"&id="+id;
    return this.http.get(direccion).toPromise();
  }

}
