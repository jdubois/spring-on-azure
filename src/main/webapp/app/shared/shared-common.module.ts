import { NgModule } from '@angular/core';

import { BugtrackerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [BugtrackerSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [BugtrackerSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class BugtrackerSharedCommonModule {}
