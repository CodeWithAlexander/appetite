import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private url= 'http://localhost/final/server/';
  constructor(private http: HttpClient) { }
  //get all posts liked by the user in order to diplay
  getDetails(){
    const token=localStorage.getItem('token');
    const headers=new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.url}liked.php`,{headers});
}
}
