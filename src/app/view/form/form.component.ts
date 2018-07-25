import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Record, RecordReference, ValidationResult, ValidationError } from '../../../common/record/record';
import { ApiService } from '../../api/api.service';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	@Input()
	public attributes: string[];
	@Input()
	public reference: RecordReference;
	public record: Observable<Record>;
	public validationState: ValidationResult;

	constructor(protected _service: ApiService, protected _route: ActivatedRoute) { }

	ngOnInit() {

		if (!this.reference || !this.reference.id) {
			this.record = this._route.paramMap.pipe(switchMap(paramMap => {
				if (!paramMap.has("collection")) {
					throw new Error("No collection provided to this form");
				}
				else {
					this.reference = paramMap.has('id') ?
						new RecordReference(paramMap.get("collection"), paramMap.get("id")) :
						new RecordReference(paramMap.get("collection"));
				}

				return this._service.retrieve(this.reference).pipe(take(1), switchMap(result => result.data));
			}));
		}
		else if (this.reference) {
			this.record = of(new Record(this.reference.collection));
		}
	}

	public fieldChanged(record: Record, attribute: string, changeEvent: Event) {
		record.setValue(attribute, (<any>changeEvent.target).value);
	}

	public submit(record: Record) {
		// Clear any errors while we're working?
		this.validationState = new ValidationResult();

		record.validate().then(validationResult => {
			this.validationState = validationResult;
		
			if (this.validationState.valid) {
				if (record.exists) {
					return this._service.update(record);
				}
				else {
					return this._service.create(record);
				}
			}
			else {
				return Promise.resolve(null);
			}
		}).then(crudResult => {
			if (crudResult) {
				// Do something.
			}
		});
	}

	// Maybe should be protected?
	public showGlobalError(error: Error | string) {
		this.validationState.errors.push(new ValidationError((error instanceof Error) ? error.message : error));
	}
}
