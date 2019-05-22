import { ITicket } from 'app/shared/model/ticket.model';

export interface ILabel {
  id?: number;
  label?: string;
  tickets?: ITicket[];
}

export class Label implements ILabel {
  constructor(public id?: number, public label?: string, public tickets?: ITicket[]) {}
}
