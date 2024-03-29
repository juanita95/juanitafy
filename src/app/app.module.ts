import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignerModule } from './shared/material-designer/material-designer.module';
import { ComponentsModule } from './ui/components/components.module';
import { PagesModule } from './ui/pages/pages.module';
import { CoreModule } from './core/core.module';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './shared/services/interceptor.service';
import { ROOT_REDUCERS } from './configuration/ngrx/app.state';
import { EffectsModule } from '@ngrx/effects';
import { TrackEffect } from './configuration/ngrx/track/track.effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { NgxLoadingModule } from 'ngx-loading';
import { UserEffect } from './configuration/ngrx/user/user.effects';
import { LottieModule } from 'ngx-lottie';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [{ tracks: ['isFavorite', 'favorites'] }, { auth: ['accessToken'] }],
    rehydrate: true,
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
export function playerFactory(): any {
  return import('lottie-web');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignerModule,
    ComponentsModule,
    CoreModule,
    PagesModule,
    NgxLoadingModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
    EffectsModule.forRoot([TrackEffect, UserEffect]),
    LottieModule.forRoot({ player: playerFactory })  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
