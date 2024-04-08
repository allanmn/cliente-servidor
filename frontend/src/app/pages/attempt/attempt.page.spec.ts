import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttemptPage } from './attempt.page';

describe('AttemptPage', () => {
  let component: AttemptPage;
  let fixture: ComponentFixture<AttemptPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AttemptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
