import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITicket, Ticket } from 'app/shared/model/ticket.model';
import { TicketService } from './ticket.service';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project';
import { IUser, UserService } from 'app/core';
import { ILabel } from 'app/shared/model/label.model';
import { LabelService } from 'app/entities/label';

@Component({
  selector: 'jhi-ticket-update',
  templateUrl: './ticket-update.component.html'
})
export class TicketUpdateComponent implements OnInit {
  ticket: ITicket;
  isSaving: boolean;

  projects: IProject[];

  users: IUser[];

  labels: ILabel[];
  dueDateDp: any;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [],
    dueDate: [],
    done: [],
    project: [],
    assignedTo: [],
    labels: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ticketService: TicketService,
    protected projectService: ProjectService,
    protected userService: UserService,
    protected labelService: LabelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ticket }) => {
      this.updateForm(ticket);
      this.ticket = ticket;
    });
    this.projectService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProject[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProject[]>) => response.body)
      )
      .subscribe((res: IProject[]) => (this.projects = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.labelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILabel[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILabel[]>) => response.body)
      )
      .subscribe((res: ILabel[]) => (this.labels = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(ticket: ITicket) {
    this.editForm.patchValue({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      dueDate: ticket.dueDate,
      done: ticket.done,
      project: ticket.project,
      assignedTo: ticket.assignedTo,
      labels: ticket.labels
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ticket = this.createFromForm();
    if (ticket.id !== undefined) {
      this.subscribeToSaveResponse(this.ticketService.update(ticket));
    } else {
      this.subscribeToSaveResponse(this.ticketService.create(ticket));
    }
  }

  private createFromForm(): ITicket {
    const entity = {
      ...new Ticket(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      description: this.editForm.get(['description']).value,
      dueDate: this.editForm.get(['dueDate']).value,
      done: this.editForm.get(['done']).value,
      project: this.editForm.get(['project']).value,
      assignedTo: this.editForm.get(['assignedTo']).value,
      labels: this.editForm.get(['labels']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITicket>>) {
    result.subscribe((res: HttpResponse<ITicket>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProjectById(index: number, item: IProject) {
    return item.id;
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackLabelById(index: number, item: ILabel) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
