import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ticket } from 'app/shared/model/ticket.model';
import { TicketService } from './ticket.service';
import { TicketComponent } from './ticket.component';
import { TicketDetailComponent } from './ticket-detail.component';
import { TicketUpdateComponent } from './ticket-update.component';
import { TicketDeletePopupComponent } from './ticket-delete-dialog.component';
import { ITicket } from 'app/shared/model/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketResolve implements Resolve<ITicket> {
  constructor(private service: TicketService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITicket> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Ticket>) => response.ok),
        map((ticket: HttpResponse<Ticket>) => ticket.body)
      );
    }
    return of(new Ticket());
  }
}

export const ticketRoute: Routes = [
  {
    path: '',
    component: TicketComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Tickets'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TicketDetailComponent,
    resolve: {
      ticket: TicketResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tickets'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TicketUpdateComponent,
    resolve: {
      ticket: TicketResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tickets'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TicketUpdateComponent,
    resolve: {
      ticket: TicketResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tickets'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ticketPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TicketDeletePopupComponent,
    resolve: {
      ticket: TicketResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tickets'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
