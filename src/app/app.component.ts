import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { AuthInterceptor } from './core/interceptors/auth.interceptor';
// import { JwtInterceptorService } from '@services/login/jwt-interceptor.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  // providers:[
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  // ],
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'teacher-attendance-front';
}
