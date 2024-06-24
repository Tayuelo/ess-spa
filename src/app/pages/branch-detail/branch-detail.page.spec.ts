import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BranchDetailPage } from './branch-detail.page';

describe('ServiceDetailPage', () => {
  let component: BranchDetailPage;
  let fixture: ComponentFixture<BranchDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
