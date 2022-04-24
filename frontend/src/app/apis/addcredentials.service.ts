import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddcredentialsService {
  url= 'http://localhost/final/server/';
  constructor(private http: HttpClient) { }
  addCredentials(creds: any){
    return this.http.post(this.url+'post_data.php',creds);
  }
}
