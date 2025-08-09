import { CanActivateFn } from '@angular/router';

export const protegerGuard: CanActivateFn = (route, state) => {
  return true;
};
