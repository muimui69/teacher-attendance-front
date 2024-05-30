import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

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
  signinForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
      return;
    }
    this.isLoading = true;
    console.log(this.signinForm.valueChanges)
    // this.authService.signup(this.signinForm.value).subscribe(
    //   response => {
    //     this.isLoading = false;
    //     this.router.navigate(['/login']);
    //     this.snackBar.open(`Bienvenido a PointSync ${response.data.user.name}!`, 'Close', {
    //       duration: 3000
    //     });
    //   },
    //   error => {
    //     this.isLoading = false;
    //     console.error(error);
    //     this.snackBar.open('Ha ocurrido un error. Verifique que llenó todos los campos correctamente.', 'Close', {
    //       duration: 3000,
    //       panelClass: ['snack-bar-error']
    //     });
    //   }
    // );
  }
}