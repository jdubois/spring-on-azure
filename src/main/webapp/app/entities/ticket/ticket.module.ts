import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BugtrackerSharedModule } from 'app/shared';
import {
  TicketComponent,
  TicketDetailComponent,
  TicketUpdateComponent,
  TicketDeletePopupComponent,
  TicketDeleteDialogComponent,
  ticketRoute,
  ticketPopupRoute
} from './';

const ENTITY_STATES = [...ticketRoute, ...ticketPopupRoute];

@NgModule({
  imports: [BugtrackerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TicketComponent, TicketDetailComponent, TicketUpdateComponent, TicketDeleteDialogComponent, TicketDeletePopupComponent],
  entryComponents: [TicketComponent, TicketUpdateComponent, TicketDeleteDialogComponent, TicketDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BugtrackerTicketModule {}
