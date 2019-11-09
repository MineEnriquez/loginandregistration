import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getInformatioFromDB();
   }
  
  getInformatioFromDB(){
    let tempObservable = this._http.get('/getInformationRoute');   //this wil now work because is not implemented in this project..
    tempObservable.subscribe(data =>{ 
      console.log("Got our tasks", data)
    });
  } 

}

