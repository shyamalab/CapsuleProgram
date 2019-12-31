import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AddtaskComponent } from './addtask/addtask.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonutilsModule } from './commonutils.module';
import { EdittaskComponent } from './edittask/edittask.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ViewtaskComponent,
    AddtaskComponent,
    EdittaskComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    CommonutilsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
