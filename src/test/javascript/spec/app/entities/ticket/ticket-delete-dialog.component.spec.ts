/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BugtrackerTestModule } from '../../../test.module';
import { TicketDeleteDialogComponent } from 'app/entities/ticket/ticket-delete-dialog.component';
import { TicketService } from 'app/entities/ticket/ticket.service';

describe('Component Tests', () => {
  describe('Ticket Management Delete Component', () => {
    let comp: TicketDeleteDialogComponent;
    let fixture: ComponentFixture<TicketDeleteDialogComponent>;
    let service: TicketService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BugtrackerTestModule],
        declarations: [TicketDeleteDialogComponent]
      })
        .overrideTemplate(TicketDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TicketDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TicketService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
