import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LoginService } from '../../../services/login/login.service';
import { LoginRequest } from '../../../interfaces/loginRequest.interface';

@Component({
  selector: 'app-user-signin-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './user-signin-form.component.html',
})

export class UserSigninFormComponent implements OnInit {
  // signinForm!: FormGroup;
  isLoading = false;
  loginError:string = "";
  signinForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService : LoginService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  // onSubmit(): void {
  //   if (this.signinForm.invalid) {
  //     return;
  //   }
  //   this.isLoading = true;
  //   console.log(this.signinForm.valueChanges)
  //   // this.authService.signup(this.signinForm.value).subscribe(
  //   //   response => {
  //   //     this.isLoading = false;
  //   //     this.router.navigate(['/login']);
  //   //     this.snackBar.open(`Bienvenido a PointSync ${response.data.user.name}!`, 'Close', {
  //   //       duration: 3000
  //   //     });
  //   //   },
  //   //   error => {
  //   //     this.isLoading = false;
  //   //     console.error(error);
  //   //     this.snackBar.open('Ha ocurrido un error. Verifique que llenó todos los campos correctamente.', 'Close', {
  //   //       duration: 3000,
  //   //       panelClass: ['snack-bar-error']
  //   //     });
  //   //   }
  //   // );
  // }

  get email(){
    return this.signinForm.controls.username;
  }

  get password()
  {
    return this.signinForm.controls.password;
  }

  onSubmit(): void {
    if(this.signinForm.valid){
      this.loginError="";
      this.loginService.login(this.signinForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/dashboard');
          this.signinForm.reset();
        }
      })

    }
    else{
      this.signinForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }
}
