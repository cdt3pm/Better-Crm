import { NgModule } from '@angular/core'
import { ApiService } from '../api/api.service';
import { ViewModule } from '../view/view.module';
import { MetadataComponent } from './metadata.component';

@NgModule({
	imports: [ViewModule],
	providers: [ApiService],
	declarations: [ MetadataComponent ]
})
export class MetadataModule {}
