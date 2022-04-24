import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CredentialsService } from 'src/app/apis/credentials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: Credential;
  constructor(private service: CredentialsService, private alert: AlertController, private route: Router) { }
  async onSubmit(form: NgForm) {
    console.log('hi');
      this.service.verifyCredentials(form.value).subscribe(console.log);
      this.route.navigate(['/posts']);
  }
  ngOnInit() {
  }

}
