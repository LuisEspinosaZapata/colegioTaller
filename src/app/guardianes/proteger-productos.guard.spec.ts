import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { protegerProductosGuard } from './proteger-productos.guard';

describe('protegerProductosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => protegerProductosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
