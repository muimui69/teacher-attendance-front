import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorInterceptorService } from '@services/login/error-interceptor.service';
import { JwtInterceptorService } from '@services/login/jwt-interceptor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ]
})
export class AppComponent {
  title = 'teacher-attendance-front';
}
