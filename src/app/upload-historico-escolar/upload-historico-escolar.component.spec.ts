import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadHistoricoEscolarComponent } from './upload-historico-escolar.component';

describe('UploadHistoricoEscolarComponent', () => {
  let component: UploadHistoricoEscolarComponent;
  let fixture: ComponentFixture<UploadHistoricoEscolarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadHistoricoEscolarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadHistoricoEscolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
