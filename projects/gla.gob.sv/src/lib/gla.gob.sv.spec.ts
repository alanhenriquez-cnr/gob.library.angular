import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlaGobSv } from './gla.gob.sv';

describe('GlaGobSv', () => {
  let component: GlaGobSv;
  let fixture: ComponentFixture<GlaGobSv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlaGobSv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlaGobSv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
