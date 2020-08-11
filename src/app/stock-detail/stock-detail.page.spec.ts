import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StockDetailPage } from './stock-detail.page';

describe('StockDetailPage', () => {
  let component: StockDetailPage;
  let fixture: ComponentFixture<StockDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StockDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
