import { Routes } from '@angular/router';

// guards
import { IsAuthenticatedGuard } from './services';

// components
import { BaseComponent } from './content/base/base.component';

export const AppRoutes: Routes = [
	{
		path: '',
		component: BaseComponent
	},
	{
		path: ':slug',
		component: BaseComponent
	}
];
