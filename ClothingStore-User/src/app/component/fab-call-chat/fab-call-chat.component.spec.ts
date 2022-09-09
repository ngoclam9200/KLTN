import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabCallChatComponent } from './fab-call-chat.component';

describe('FabCallChatComponent', () => {
  let component: FabCallChatComponent;
  let fixture: ComponentFixture<FabCallChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabCallChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabCallChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
