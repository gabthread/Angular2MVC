import { NgModule, ErrorHandler } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './components/home.component';
import { UserComponent } from './components/user.component';
import { SearchComponent } from "./shared/search.component";

import { UserService } from './service/user.service';

import { UserFilterPipe } from "./filter/user.pipe";

import  AppErrorHandler  from "./shared/errorhandler";


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule, FormsModule], //Imports contains modules list.
    declarations: [AppComponent, HomeComponent, UserComponent, UserFilterPipe, SearchComponent], //contains list of components and filters, etc. we will add user components in next steps.
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: ErrorHandler, useClass: AppErrorHandler }, UserService], //ontains the list of services.
    bootstrap: [AppComponent] //contains the entry component
})

export class AppModule { }