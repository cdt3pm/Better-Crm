import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api/api.service';
import { GridComponent } from './grid/grid.component';
import { CardComponent } from './card/card.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
		{ provide: ApiService, useFactory: ApiService.get }
  ],
  declarations: [CardComponent, GridComponent, FormComponent]
})
export class ViewModule { }
