import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { AppComponent } from './app.component';
import { MetadataModule } from './metadata/metadata.module';
import { ApiService } from './api/api.service';
import { APP_ROUTER } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MetadataModule, APP_ROUTER
  ],
  // TODO: Get the value of the database provider from elsewhere (config file). Don't use "useClass" in the future.
  providers: [
    { provide: ApiService, useFactory: ApiService.get }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
