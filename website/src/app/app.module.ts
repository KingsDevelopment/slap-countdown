import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

// routes
import { AppRoutes }  from './app.routes';

// Saitama-SDK
import { SDKBrowserModule } from './sdk';

// dependencies
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MomentModule } from 'angular2-moment';
import { CalendarModule } from 'primeng/primeng';

// services
import { ValidationService,
		LogService } from './services';

// guards
import { IsAuthenticatedGuard } from './services';

// pipes
import { ShortenNumberPipe } from './pipes'

// components
import { AppComponent } from './app.component';
import { BaseComponent } from './content/base/base.component';

@NgModule({
	entryComponents: [
	],
	declarations: [
		// dependencies

		// pipes
		ShortenNumberPipe,

		// components
		AppComponent,
		BaseComponent
	],
	imports: [
		// sdk
		SDKBrowserModule.forRoot(),

		// angular
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		RouterModule,
		HttpModule,
		JsonpModule,

		// dependencies
		SimpleNotificationsModule.forRoot(),
		MomentModule,
		CalendarModule,

		// additional routes, load in last. (Inccludes 404 for any additional weird page)
		RouterModule.forRoot(AppRoutes)
	],
	providers: [
		// dependencies

		// services
		ValidationService,
		LogService,

		// guards
		IsAuthenticatedGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
