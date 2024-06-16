import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '@services/login/login.service';
import { SidemenuComponent } from '@shared/components/sidemenu/sidemenu.component';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, SidemenuComponent,CommonModule],
  templateUrl: './dashboard.component.html',
})

export default class DashboardComponent implements OnInit{

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    console.log('Valor del token:', this.loginService.userToken);
  }



}
