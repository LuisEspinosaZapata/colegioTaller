import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { protegerFacturaGuard } from './proteger-factura.guard';

describe('protegerFacturaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => protegerFacturaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
