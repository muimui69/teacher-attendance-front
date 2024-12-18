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





import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTreeNode, MatTreeNodeToggle } from '@angular/material/tree';
import { Router, RouterModule, Routes } from '@angular/router';
import { routes as dashboardRoutes } from '../../../dashboard/dashboard-routing.module';
import { IconService } from '../../services/icon.service';
import { CommonModule } from '@angular/common';
import { LucideIconData } from 'lucide-angular/icons/types';
import { LucideAngularModule } from 'lucide-angular';
import { MaterialModule } from '../material/material.module';
import { LoginService } from '@services/login/login.service';
import { MatSidenav } from '@angular/material/sidenav';

interface MenuItem {
  title: string;
  path: string;
  icon: LucideIconData;
  isExpanded: boolean;
  children?: MenuItem[];
}

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, LucideAngularModule, MatTreeNode, MatTreeNodeToggle]
})

export class SidemenuComponent implements OnInit {
  userLoginOn: boolean = true;

  sidebarItems: MenuItem[] = [];

  constructor(private iconService: IconService, private loginService: LoginService, private router: Router) {
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


  ngOnInit(): void {
    this.checkWindowSize(); 
    this.loginService.currentUserLoginOn.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      }
    )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSize(); // Verificar el tamaño de la ventana cuando cambia
  }

  checkWindowSize() {
    // Obtener el ancho de la ventana actual
    const screenWidth = window.innerWidth;

    // Definir el punto de quiebre para colapsar (ejemplo, ancho menor o igual a 768px)
    const breakpoint = 768 ;
    const breakpointTwo =  1024;

    // Inicializar collapsed según el tamaño de la pantalla
    this.collapsed = screenWidth <= breakpoint || (screenWidth <= breakpointTwo  );
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/home'])
  }

  collapsed = false
  screenWidth = 0


  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();


}

