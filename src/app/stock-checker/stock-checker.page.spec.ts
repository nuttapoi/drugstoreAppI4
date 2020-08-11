import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StockCheckerPage } from './stock-checker.page';

describe('StockCheckerPage', () => {
  let component: StockCheckerPage;
  let fixture: ComponentFixture<StockCheckerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCheckerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StockCheckerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
