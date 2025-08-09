import { CanActivateFn } from '@angular/router';

export const protegerFacturaGuard: CanActivateFn = (route, state) => {
  return true;
};
