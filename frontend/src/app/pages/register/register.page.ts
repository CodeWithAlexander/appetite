import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddcredentialsService } from 'src/app/apis/addcredentials.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: Credential;
  continue: boolean;
  constructor(private service: AddcredentialsService, private alert: AlertController, private route: Router) { }
  async onSubmit(form: NgForm) {
    if(form.value.password===''||form.value.confirm===''||form.value.username===''||form.value.email===''){
      const x = this.alert.create({ message: 'Please enter credentials' });
      (await x).present();
      this.continue=false;
    }
    if (form.value.password === form.value.confirm&&this.continue) {
      this.service.addCredentials(form.value).subscribe(console.log);
      this.route.navigate(['/login']);
    } else if(this.continue) {
      const x = this.alert.create({ message: 'passwords do not match' });
      (await x).present();
    }
    this.continue=true;
  }
  ngOnInit() {
  }

}
