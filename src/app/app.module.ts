import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoffeeModule } from './coffee/coffee.module';
import { TaigaUiModule } from './core/modules/taiga-ui/taiga-ui.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // UI
    TaigaUiModule,

    // App
    AppRoutingModule,
    CoffeeModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    // AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage

    // Pwa
    ServiceWorkerModule.register('ngsw-worker.js', {
      scope: '/',
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),

    // NgRx
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'My Coffee App DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),

    // Pipes
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
