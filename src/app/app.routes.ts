import { Routes, RouterModule } from '@angular/router';
import { MetadataComponent } from './metadata/metadata.component';
import { GridComponent } from './view/grid/grid.component';
import { FormComponent } from './view/form/form.component';

const APP_ROUTES: Routes = [
	{ path: '', redirectTo: '/customization' },
	{ path: 'customization', component: MetadataComponent },
	{ path: ':collection', component: GridComponent },
	{ path: ':collection/new', component: FormComponent }
	{ path: ':collection/:id', component: FormComponent }
];

export const APP_ROUTER = RouterModule.forRoot(APP_ROUTES);