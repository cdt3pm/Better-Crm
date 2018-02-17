import { NgModule } from '@angular/core'
import { DB } from '../app.module';
import { MongoService } from '../backend/mongo.service';
import { ViewModule } from '../view/view.module';
import { MetadataComponent } from './metadata.component';

@NgModule({
	imports: [ViewModule],
	providers: [
		{ provide: DB, useClass: MongoService }
	],
	declarations: [ MetadataComponent ]
})
export class MetadataModule {}