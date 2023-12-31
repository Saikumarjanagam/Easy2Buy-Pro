import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "src/services/user.service";

@Injectable()

export class AdminGuard implements CanActivate {
    constructor(private router: Router, private _userService: UserService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._userService.firstName && this._userService.isAdmin === true) {
            return true
        }
        else {
            this.router.navigate(['/un-auth'])
            return false;
        }
    }
}