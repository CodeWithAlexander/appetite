import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { PostService } from 'src/app/apis/post.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  picture: string;
  convertedimage: string;

  constructor(private post: PostService) { }

  ngOnInit() {
  }
  //using the camera
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.picture = image.base64String;
    this.convertedimage = 'data:image/jpeg;base64,' + this.picture;
  }

  //adding the post to the database
  submitAddition() {
    //title value
    const temp = document.getElementById('to_title') as HTMLInputElement | null;
    //desc value
    const temp2 = document.getElementById('to_desc') as HTMLInputElement | null;
    if (temp != null && temp2 != null) {
      const title = temp.innerText;
      const description = temp2.innerText;
      const image=this.convertedimage;
      const obj=[title,description,image];
      this.post.addPost(obj).subscribe(console.log);
    }
  }
}
