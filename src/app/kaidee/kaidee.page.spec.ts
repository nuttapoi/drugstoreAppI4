import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KaideePage } from './kaidee.page';

describe('KaideePage', () => {
  let component: KaideePage;
  let fixture: ComponentFixture<KaideePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaideePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KaideePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
