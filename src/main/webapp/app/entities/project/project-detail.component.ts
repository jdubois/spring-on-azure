import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProject } from 'app/shared/model/project.model';

@Component({
  selector: 'jhi-project-detail',
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {
  project: IProject;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ project }) => {
      this.project = project;
    });
  }

  previousState() {
    window.history.back();
  }
}
