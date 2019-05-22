/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BugtrackerTestModule } from '../../../test.module';
import { ProjectUpdateComponent } from 'app/entities/project/project-update.component';
import { ProjectService } from 'app/entities/project/project.service';
import { Project } from 'app/shared/model/project.model';

describe('Component Tests', () => {
  describe('Project Management Update Component', () => {
    let comp: ProjectUpdateComponent;
    let fixture: ComponentFixture<ProjectUpdateComponent>;
    let service: ProjectService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BugtrackerTestModule],
        declarations: [ProjectUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProjectUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProjectUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProjectService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Project(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Project();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
