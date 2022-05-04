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
  async onSubmit(form: NgForm) {
    this.service.verifyCredentials(form.value).subscribe(
      async (token) => {
        localStorage.setItem('token', token);
        this.route.navigate(['tabs']);
      },
      async () => {
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
