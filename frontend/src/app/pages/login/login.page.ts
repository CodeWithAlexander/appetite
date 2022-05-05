import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CredentialsService } from 'src/app/apis/credentials.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: Credential;
  constructor(private service: CredentialsService, private alert: AlertController, private route: Router) { }
  //login submitted
  async onSubmit(form: NgForm) {
    //unset token in local storage (used for debugging)
    localStorage.removeItem('token');
    //call method to call api to verify credentials
    this.service.verifyCredentials(form.value).subscribe(
      async (token) => {
        localStorage.setItem('token', token);
        //true set token in local storage and redirect
        this.route.navigate(['tabs']);
      },
      async () => {
        //failed output message
        const alert = await this.alert.create({
          message: 'Login Failed',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
  ngOnInit() {
  }

}
