import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl:'./sidemenu.component.css'
})

export class SidemenuComponent {
  public sidebarItems = routes
  .map( r => r.children ?? [] ).flat()
  .filter( r => r && r.path)
  .filter( r => r && !r.path?.includes(':'))
}
