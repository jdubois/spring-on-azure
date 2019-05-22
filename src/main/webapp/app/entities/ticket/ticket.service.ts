import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITicket } from 'app/shared/model/ticket.model';

type EntityResponseType = HttpResponse<ITicket>;
type EntityArrayResponseType = HttpResponse<ITicket[]>;

@Injectable({ providedIn: 'root' })
export class TicketService {
  public resourceUrl = SERVER_API_URL + 'api/tickets';

  constructor(protected http: HttpClient) {}

  create(ticket: ITicket): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ticket);
    return this.http
      .post<ITicket>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ticket: ITicket): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ticket);
    return this.http
      .put<ITicket>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITicket>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITicket[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ticket: ITicket): ITicket {
    const copy: ITicket = Object.assign({}, ticket, {
      dueDate: ticket.dueDate != null && ticket.dueDate.isValid() ? ticket.dueDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dueDate = res.body.dueDate != null ? moment(res.body.dueDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ticket: ITicket) => {
        ticket.dueDate = ticket.dueDate != null ? moment(ticket.dueDate) : null;
      });
    }
    return res;
  }
}
