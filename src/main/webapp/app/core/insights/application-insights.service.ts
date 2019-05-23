import { Injectable, OnInit } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable()
export class ApplicationInsightsService {
  private routerSubscription: Subscription;

  private appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: 'a8aca698-844c-4515-9875-fb6b480e4fec'
    }
  });

  constructor(private router: Router) {
    this.appInsights.loadAppInsights();
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof ResolveEnd)).subscribe((event: ResolveEnd) => {
      const activatedComponent = this.getActivatedComponent(event.state.root);
      if (activatedComponent) {
        this.logPageView(`${activatedComponent.name} ${this.getRouteTemplate(event.state.root)}`, event.urlAfterRedirects);
      }
    });
  }

  setUserId(userId: string) {
    this.appInsights.setAuthenticatedUserContext(userId);
  }

  clearUserId() {
    this.appInsights.clearAuthenticatedUserContext();
  }

  logPageView(name?: string, uri?: string) {
    this.appInsights.trackPageView({ name, uri });
  }

  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }

    return snapshot.component;
  }

  private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
    let path = '';
    if (snapshot.routeConfig) {
      path += snapshot.routeConfig.path;
    }

    if (snapshot.firstChild) {
      return path + this.getRouteTemplate(snapshot.firstChild);
    }

    return path;
  }
}
