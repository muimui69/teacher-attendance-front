import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { IconService } from '../../services/icon.service';
import { routes } from '../../../app.routes';
import { SidemenuTreeComponent } from '../sidemenu-tree/sidemenu-tree.component';
import { TreeNode } from '../sidemenu-tree/example-data';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTree, MatTreeNestedDataSource, MatTreeNode } from '@angular/material/tree';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule,MatTree,MatTreeNode,MatIcon],
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

  
  
  constructor(private iconService: IconService) { }
  
  toggleSubMenu(item: any): void {
    if (item.children) {
      item.isExpanded = !item.isExpanded;
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

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

  public sidebarItems = this.organizeRoutes(routes.find(route => route)?.children || []).map(route => ({
    ...route,
    icon: this.iconService.getIcon(route.data?.icon),
    isExpanded: false,
    children: route.children.map((child: any) => ({
      ...child,
      path: `${child.path}`,
      icon: this.iconService.getIcon(child.data?.icon)
    }))
  }));

  // treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  // dataSource = new MatTreeNestedDataSource<TreeNode>();

  // sidebarItems: TreeNode[] = [
  //   {
  //     name: 'Dashboard',
  //     path: '/dashboard',
  //     icon: 'dashboard',
  //     children: []
  //   },
  //   {
  //     name: 'Settings',
  //     path: '/settings',
  //     icon: 'settings',
  //     isExpanded: false,
  //     children: [
  //       {
  //         name: 'Profile',
  //         path: '/settings/profile',
  //         icon: 'person',
  //         children: []
  //       },
  //       {
  //         name: 'Security',
  //         path: '/settings/security',
  //         icon: 'security',
  //         children: []
  //       }
  //     ]
  //   }
  // ];

  // constructor() {
  //   this.dataSource.data = this.sidebarItems;
  // }

  // hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  // toggleSubMenu(node: TreeNode) {
  //   node.isExpanded = !node.isExpanded;
  //   if (node.isExpanded) {
  //     this.treeControl.expand(node);
  //   } else {
  //     this.treeControl.collapse(node);
  //   }
  // }
  
}

