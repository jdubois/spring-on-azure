import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITicket } from 'app/shared/model/ticket.model';
import { TicketService } from './ticket.service';

@Component({
  selector: 'jhi-ticket-delete-dialog',
  templateUrl: './ticket-delete-dialog.component.html'
})
export class TicketDeleteDialogComponent {
  ticket: ITicket;

  constructor(protected ticketService: TicketService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ticketService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'ticketListModification',
        content: 'Deleted an ticket'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ticket-delete-popup',
  template: ''
})
export class TicketDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ticket }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TicketDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ticket = ticket;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ticket', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ticket', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
