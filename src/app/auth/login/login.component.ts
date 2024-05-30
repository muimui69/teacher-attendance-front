import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserSigninFormComponent } from '@shared/components/user-signin-form/user-signin-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, UserSigninFormComponent],
  templateUrl: './login.component.html',
})

export default class LoginComponent  {


}
