import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private url='http://localhost/final/server/';
  constructor(private http: HttpClient) { }

  verifyCredentials(creds: any){
     return this.http
    .post<{ token: string }>(this.url+'api.php', creds)
    .pipe(map((response) => response.token));
  }
}
