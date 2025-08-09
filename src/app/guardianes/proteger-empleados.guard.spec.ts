import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { protegerEmpleadosGuard } from './proteger-empleados.guard';

describe('protegerEmpleadosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => protegerEmpleadosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
