import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Posts{
  // eslint-disable-next-line @typescript-eslint/naming-convention
  post_id: string;
  id: string;
  image: string;
  description: string;
}
@Injectable({
  providedIn: 'root'
})
export class GetpostService {

  private url= 'http://localhost/final/server/';
  constructor(private http: HttpClient) { }
  setLikes(creds: any){
    const token=localStorage.getItem('token');
    return this.http.post(this.url+'likes.php',{token:`Bearer ${token}`, creds});
  }
  getDetails(){
    console.log('im here');
    const token=localStorage.getItem('token');
    const headers=new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.url}render.php`,{headers});
  }
}
