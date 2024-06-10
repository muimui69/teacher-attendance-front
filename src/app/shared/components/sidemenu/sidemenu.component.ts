// // import { CommonModule } from '@angular/common';
// // import { Component } from '@angular/core';
// // import { RouterModule } from '@angular/router';
// // import { LucideAngularModule } from 'lucide-angular';
// // import { IconService } from '../../services/icon.service';
// // import { SidemenuTreeComponent } from '../sidemenu-tree/sidemenu-tree.component';
// // import { TreeNode } from '../sidemenu-tree/example-data';
// // import { NestedTreeControl } from '@angular/cdk/tree';
// // import { MatTree, MatTreeNestedDataSource, MatTreeNode } from '@angular/material/tree';
// // import { MatIcon } from '@angular/material/icon';
// // import { routes } from '../../../dashboard/dashboard-routing.module';

// // @Component({
// //   selector: 'app-sidemenu',
// //   standalone: true,
// //   imports: [CommonModule, RouterModule, LucideAngularModule,MatTree,MatTreeNode,MatIcon],
// //   templateUrl: './sidemenu.component.html',
// // })

// // export class SidemenuComponent {
// //   constructor(private iconService: IconService) {}

// //   toggleSubMenu(item: any): void {
// //     if (item.children) {
// //       item.isExpanded = !item.isExpanded;
// //     }
// //   }

// //   trackByIndex(index: number): number {
// //     return index;
// //   }

// //   public getIconData(name: string): any {
// //     const icon = this.iconService.getIcon(name);
// //     return icon;
// //   }

// //   private organizeRoutes(routes: any[]): any[] {
// //     const routeMap: any = {};

// //     routes.forEach(route => {
// //       if (!route.path.includes('/') && route.path) {
// //         routeMap[route.path] = { ...route, children: [] };
// //       }
// //     });

// //     routes.forEach(route => {
// //       const segments = route.path.split('/');
// //       if (segments.length > 1) {
// //         const parentPath = segments.slice(0, -1).join('/');
// //         if (routeMap[parentPath]) {
// //           routeMap[parentPath].children.push(route);
// //         }
// //       }
// //     });

// //     return Object.values(routeMap);
// //   }

// //   public sidebarItems = this.organizeRoutes(routes.find(route => route.path === '')?.children || []).map(route => ({
// //     ...route,
// //     icon: this.iconService.getIcon(route.data?.icon),
// //     isExpanded: false,
// //     children: route.children?.map((child: any) => ({
// //       ...child,
// //       path: `${route.path}/${child.path}`,
// //       icon: this.iconService.getIcon(child.data?.icon)
// //     })) || []
// //   }));

// // }





import { Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTreeNode, MatTreeNodeToggle } from '@angular/material/tree';
import { RouterModule, Routes } from '@angular/router';
import { routes as dashboardRoutes } from '../../../dashboard/dashboard-routing.module';
import { IconService } from '../../services/icon.service';
import { CommonModule } from '@angular/common';
import { LucideIconData } from 'lucide-angular/icons/types';
import { LucideAngularModule } from 'lucide-angular';
import { MaterialModule } from '../material/material.module';

interface MenuItem {
  title: string;
  path: string;
  icon: LucideIconData;
  isExpanded: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, LucideAngularModule, MatTreeNode, MatTreeNodeToggle]
})

export class SidemenuComponent {

  sidebarItems: MenuItem[] = [];

  constructor(private iconService: IconService) {
    const sidebarItems = this.organizeRoutes(dashboardRoutes.find(route => route.path === '')?.children || []);
    console.log(sidebarItems);
    this.sidebarItems = sidebarItems;
  }

  public getIconData(name: string): LucideIconData {
    const icon = this.iconService.getIcon(name);
    return icon;
  }

  public toggleSubMenu(item: any): void {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    }
  }

  public getFullPath(itemPath: string, childPath: string): string {
    return `${itemPath}/${childPath}`;
  }


  private organizeRoutes(routes: any[]): MenuItem[] {
    return routes
      .filter(route => route.path !== '' || route.outlet === 'aux') // Filtrar las rutas con path vacío
      .map(route => this.convertRouteToMenuItem(route))
      .flat();
  }

  private convertRouteToMenuItem(route: any): MenuItem {
    return {
      title: route.title,
      path: route.path,
      icon: this.iconService.getIcon(route.data?.icon),
      isExpanded: false,
      children: route.children
        ?.filter((child: any) => child.path !== '') // Filtrar rutas hijas con path vacío
        .map((child: any) => ({
          title: child.title,
          path: `${route.path}/${child.path}`,
          icon: this.iconService.getIcon(child.data?.icon),
          isExpanded: false,
        })) || []
    };
  }
}

