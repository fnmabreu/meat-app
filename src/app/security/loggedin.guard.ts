import {
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {
  constructor(private loginService: LoginService) {}

  checkAuthenticated(path: string): boolean {
    const loggedin = this.loginService.isLoggedIn();

    if (!loggedin) {
      this.loginService.handleLogin(`/${path}`);
    }
    return loggedin;
  }

  // Carrega módulo de compra (order) se estiver autenticado.
  canLoad(route: Route): boolean {
    console.log('canLoad');
    return this.checkAuthenticated(route.path);
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
    console.log('canActivate');
    return this.checkAuthenticated(activatedRoute.routeConfig.path);
  }
}
