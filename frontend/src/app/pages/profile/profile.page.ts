import { Component, OnInit } from '@angular/core';
import { DisplayprofileService } from 'src/app/apis/displayprofile.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  //variables to be used in the front end
  details: any[]=[];
  username: any[]=[];
  inputValue: any;
  constructor(private profile: DisplayprofileService, private route: Router) { }
  //select from credentials email
  //4 rows
  //[]
  //ngFor []
  ngOnInit() {
  }
  getUpdates(){
    //to_change is the new notes set by the user inside the <p></p> element
    const input = document.getElementById('to_change') as HTMLInputElement | null;
  if (input != null) {
    //hello is a temp variable
  const hello=input.innerText;
  this.profile.addNotes(hello).subscribe();
}
   }
   //get user details stored in db
  ionViewDidEnter() {
    console.log(localStorage.getItem('token'));
    this.profile.getDetails().subscribe((response: any)=>{
    this.details=response;
  });
  //display user's username
  this.profile.getUsername().subscribe((response: any)=>{
  this.username=response;
});
  }

}
