import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url= 'http://localhost/final/server/';

  constructor(private http: HttpClient) { }
  addPost(creds: any){
    const token=localStorage.getItem('token');
    return this.http.post(this.url+'post.php',{token:`Bearer ${token}`, creds});
  }
}
