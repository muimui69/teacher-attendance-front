import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule, Routes } from '@angular/router';
import { IconService } from '../../services/icon.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidemenu.component.html',
})

export class SidemenuComponent {
  // public sidebarItems = routes
  //   .map(r => r.children ?? []).flat()
  //   .filter(r => r && r.path)
  //   .filter(r => r && !r.path?.includes(':'))
  //   .map(r => ({
  //     ...r,
  //     icon: this.iconService.getIcon(r.data?.['icon']),
  //     isExpanded: false,
  //     children: r.children ? r.children.map(c => ({
  //       ...c,
  //       path: `${r.path}/${c.path}`,
  //       icon_child: this.iconService.getIcon(c.data?.['icon']),
  //     })) : null
  //   }));

  toggleSubMenu(item: any): void {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    }
  }

  trackByIndex(index: number): number {
    return index;
  }


  constructor(private iconService: IconService) { }


  public getIconData(name: string): any {
    const icon = this.iconService.getIcon(name);
    return icon;
  }


  private organizeRoutes(routes: any[]): any[] {
    const routeMap: any = {};

    routes.forEach(route => {
      if (!route.path.includes('/') && route.path) {
        routeMap[route.path] = { ...route, children: [] };
      }
    });

    routes.forEach(route => {
      const segments = route.path.split('/');
      if (segments.length > 1) {
        const parentPath = segments.slice(0, -1).join('/');
        if (routeMap[parentPath]) {
          routeMap[parentPath].children.push(route);
        }
      }
    });


    return Object.values(routeMap);
  }

  public sidebarItems = this.organizeRoutes(routes.find(route => route.path === 'dashboard')?.children || []).map(route => ({
    ...route,
    icon: this.iconService.getIcon(route.data?.icon),
    isExpanded: false,
    children: route.children.map((child: any) => ({
      ...child,
      path: `${child.path}`,
      icon: this.iconService.getIcon(child.data?.icon)
    }))
  }));


}

