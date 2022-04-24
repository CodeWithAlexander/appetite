import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Credential{
  id: string;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private url='http://localhost/final/server/';
  constructor(private http: HttpClient) { }

  verifyCredentials(creds: any){
    return this.http.post(this.url+'api.php',creds);
  }
}
