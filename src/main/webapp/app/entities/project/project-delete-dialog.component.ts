import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from './project.service';

@Component({
  selector: 'jhi-project-delete-dialog',
  templateUrl: './project-delete-dialog.component.html'
})
export class ProjectDeleteDialogComponent {
  project: IProject;

  constructor(protected projectService: ProjectService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.projectService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'projectListModification',
        content: 'Deleted an project'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-project-delete-popup',
  template: ''
})
export class ProjectDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ project }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProjectDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.project = project;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/project', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/project', { outlets: { popup: null } }]);
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
