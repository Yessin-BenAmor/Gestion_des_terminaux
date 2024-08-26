import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalTypesComponent } from './terminal-types.component';

describe('TerminalTypesComponent', () => {
  let component: TerminalTypesComponent;
  let fixture: ComponentFixture<TerminalTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminalTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
