import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class normalUserGuard implements CanActivate {
  
  constructor(private router : Router,
    private localService : LocalStorageService) {}

  /**
   * Verifica si el usuario puede activar la ruta.
   * @param route Información sobre la ruta activada.
   * @param state Estado del router en el momento de la activación.
   * @returns booleano indicando si el usuario puede activar la ruta.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.localService.getVariable('token')) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}
