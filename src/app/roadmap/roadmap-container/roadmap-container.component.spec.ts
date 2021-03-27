import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapContainerComponent } from './roadmap-container.component';

describe('RoadmapContainerComponent', () => {
  let component: RoadmapContainerComponent;
  let fixture: ComponentFixture<RoadmapContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
