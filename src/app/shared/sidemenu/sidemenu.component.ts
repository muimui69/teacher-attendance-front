import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { IconService } from '../../services/icon.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidemenu.component.html',
})

export class SidemenuComponent {
  public sidebarItems = routes
    .map(r => r.children ?? []).flat()
    .filter(r => r && r.path)
    .filter(r => r && !r.path?.includes(':'))
    .map(r => ({
      ...r,
      icon: this.iconService.getIcon(r.data?.['icon']),
      isExpanded: false,
      children: r.children ? r.children.map(c => ({
        ...c,
        path: `${r.path}/${c.path}`
      })) : null
    }));

  toggleSubMenu(item: any): void {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  constructor(public iconService: IconService) { 

    const menu =  routes
    .map(r => r.children ?? []).flat()
    .filter(r => r && r.path)
    .filter(r => r && !r.path?.includes(':'))
    .map(r => ({
      ...r,
      icon: this.iconService.getIcon(r.data?.['icon']),
      isExpanded: false,
      children: r.children ? r.children.map(c => ({
        ...c,
        path: `${r.path}/${c.path}`
      })) : null
    }));

    console.log('>>>>>>>>>>>>>>>>>>>',menu)
  }


}
