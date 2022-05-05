import { Component, OnInit } from '@angular/core';
import { GetpostService, Posts } from 'src/app/apis/getpost.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})

export class PostsPage implements OnInit {
  details: any[]=[];
  dbposts: Posts[];
  constructor(private posts: GetpostService) { }
  ngOnInit() {
  }
  addLike(){
    console.log('i like');
  }
  ionViewDidEnter() {
    console.log(localStorage.getItem('token'));
    this.posts.getDetails().subscribe((response: any)=>{
    this.dbposts=response;
    console.log(this.dbposts);
  });
  }

}
