import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DisplayprofileService {

  private url= 'http://localhost/final/server/';
  constructor(private http: HttpClient) { }
  //get user details stored in db
  getDetails(){
    const token=localStorage.getItem('token');
    const headers=new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.url}profile.php`,{headers});
  }

  //user updated the notes on his page
  addNotes(creds: any){
    const token=localStorage.getItem('token');
    return this.http.post(this.url+'update.php',{token:`Bearer ${token}`, creds});
  }

  //get username becuase it is stored in a different table (for security)
  getUsername(){
    const token=localStorage.getItem('token');
    const headers=new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.url}username.php`,{headers});
  }
}
