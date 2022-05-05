import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/apis/getpost.service';
import { LikesService } from 'src/app/apis/likes.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {
  dbposts: Posts[];
  constructor(private posts: LikesService) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    console.log(localStorage.getItem('token'));
    this.posts.getDetails().subscribe((response: any)=>{
    this.dbposts=response;
    console.log(this.dbposts);
  });
  }

}
