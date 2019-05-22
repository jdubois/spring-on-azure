import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITicket } from 'app/shared/model/ticket.model';

@Component({
  selector: 'jhi-ticket-detail',
  templateUrl: './ticket-detail.component.html'
})
export class TicketDetailComponent implements OnInit {
  ticket: ITicket;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ticket }) => {
      this.ticket = ticket;
    });
  }

  previousState() {
    window.history.back();
  }
}
