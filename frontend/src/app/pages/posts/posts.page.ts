import { Component, OnInit } from '@angular/core';
import { GetpostService, Posts } from 'src/app/apis/getpost.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})

export class PostsPage implements OnInit {
  //variables to be displayed
  details: any[]=[];
  dbposts: Posts[];
  constructor(private posts: GetpostService) { }
  ngOnInit() {
  }
  //user liked a post
  addLike(id: any){
    this.posts.setLikes(id).subscribe(console.log);
  }
  //get all posts and display dynamically
  ionViewDidEnter() {
    console.log(localStorage.getItem('token'));
    this.posts.getDetails().subscribe((response: any)=>{
    this.dbposts=response;
  });
  }

}
