import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { IconService } from '../../services/icon.service';
import { LucideAngularModule } from 'lucide-angular';
import { LucideIconData, LucideIconNode, LucideIcons } from 'lucide-angular/icons/types';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})

export class SidemenuComponent {
  public sidebarItems = routes
    .map(r => r.children ?? []).flat()
    .filter(r => r && r.path)
    .filter(r => r && !r.path?.includes(':'))
    .map(r => ({
      ...r,
      icon:this.iconService.getIcon(r.data?.['icon'])
    }));


  constructor(public iconService: IconService) { }

  trackByIndex(index: number): number {
    return index;
  }
  
}
