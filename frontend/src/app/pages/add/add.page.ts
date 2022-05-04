import { Component, OnInit } from '@angular/core';
import { Camera,CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  picture: string;
  convertedimage: string;

  constructor() { }

  ngOnInit() {
  }
  async takePicture(){
    const image=await Camera.getPhoto({
      quality:100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.picture=image.base64String;
    this.convertedimage= 'data:image/jpeg;base64,'+this.picture;
        console.log(this.convertedimage);
  }
  submitAddition(){
    console.log('hello');
  }
}
