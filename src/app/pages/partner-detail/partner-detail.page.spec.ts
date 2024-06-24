import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnerDetailPage } from './partner-detail.page';

describe('PartnerDetailPage', () => {
  let component: PartnerDetailPage;
  let fixture: ComponentFixture<PartnerDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
