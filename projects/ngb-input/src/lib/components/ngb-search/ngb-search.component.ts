import { HttpClient } from '@angular/common/http';
import { Component, forwardRef, Input, Output, EventEmitter, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgbInputComponent } from '../ngb-input/ngb-input.component';
import { Observable, Subject } from 'rxjs';

const debounceDefault = 550;

@Component({
    selector: 'ngb-search',
    templateUrl: './ngb-search.component.html',
    styleUrls: ['./ngb-search.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => NgbSearchComponent)
        }
    ]
})
export class NgbSearchComponent implements OnInit, OnChanges, ControlValueAccessor {
    private onChange: any = () => {};
    private onTouched: any = () => {};
    private updateOptions = new Subject<any[]>();
    public handleTypeahead: {
        search: (text: Observable<string>) => Observable<string | any[]>,
        formatter: (item: any) => string
    };
    public searchText = '';
    public searching: boolean;
    public showRequiredError: boolean = false;

    @Input()
    public name: string;
    
    @Input()
    public id: string;

    @Input()
    public value: any = '';

    @Input()
    public placeholder: string = '';

    @Input()
    public required: boolean;

    @Input()
    public disabled: boolean;

    @Input()
    public readonly: boolean;

    @Input()
    public label: string;

    @Input()
    public debounce: number;

    @Input()
    public ngModel: any;

    @Input()
    public requiredError: string = 'Campo requerido';

    @Input()
    public formatError: string = 'Formato invalido';

    @Input()
    public dirty: boolean;

    @Output()
    public ngModelChange = new EventEmitter<any>();

    @Output()
    public change = new EventEmitter<any>();

    @Input()
    public searchExternalUrl: string;

    @Input()
    public optionLabel: string;

    @Input()
    public optionValue: string;

    @Input()
    public options: any[];

    @ViewChild('ngbInputComponent', { static: false })
    public ngbInputComponent: NgbInputComponent

    @ViewChild('inputSearch', { static: false })
    public inputSearch: NgbTypeahead;

    public constructor(private http: HttpClient) {

    }

    public ngOnInit() {
        const self = this;
        if (this.searchExternalUrl && !this.debounce) {
            this.debounce = debounceDefault
        }

        this.handleTypeahead = {
            search: (text: Observable<string>): Observable<any[]> => self.updateOptions,
            formatter: (item: string) => self.optionLabel ? item[self.optionLabel] : item
        }
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.searchExternalUrl && !this.debounce) {
            this.debounce = debounceDefault;
        }

        // When the dirty attribute is set as true, then it display the error just if exists any
        if (changes.dirty && changes.dirty.currentValue) {
            setTimeout(() => {
                this.displayError();
            });
        }

        // If is add an array no empty of options, then the search text is update
        if (this.ngModel && changes.options && this.options && this.options.length > 0) {
            const ngModelStringify = Object.entries(this.ngModel).toString();
            const optionSelected = this.options.find(x => {
                let index = this.optionValue ? x[this.optionValue] : x;
                if (typeof index === 'object') {
                    return Object.entries(index).toString() === ngModelStringify;
                } else {
                    return index == this.ngModel;
                }
            });

            if (optionSelected) {
                this.searchText = this.optionLabel ? optionSelected[this.optionLabel] : this.optionLabel;
            }
        }
    }

    public writeValue(obj: any): void {
        
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public showSpinner(show: boolean) {
        this.searching = show;
    }

    public openDropdownOnFocus() {
        if (!this.searchExternalUrl) {
            this.updateSearchText(this.searchText)
        }
    }

    public updateSearchText(searchText: string) {
        this.searchText = searchText;
        this.ngModel = undefined;
        this.ngModelChange.emit(undefined);
        if (this.required && this.ngbInputComponent.dirty) {
            this.showRequiredError = true;
        }

        if (this.searchExternalUrl) {
            this.searching = true;
            this.http.get(`${this.searchExternalUrl}?query=${searchText}`).toPromise().then((options: any[]) => {
                this.updateOptions.next(options);
                this.searching = false;
            });
        } else if (!this.options) {
            this.updateOptions.next([]);
        } else {
            const searchLower = searchText.toLowerCase();
            const optionsFilter = this.options.filter(option => {
                let element = this.optionLabel ? option[this.optionLabel] : option;
                switch (typeof element) {
                    case 'object':
                        return Object.entries(element).toString().toLowerCase().indexOf(searchLower) > -1;
                    case 'string':
                        return element.toLowerCase().indexOf(searchLower) > -1;
                    default:
                        return element == searchLower;
                }
            });
            this.updateOptions.next(optionsFilter);
        }
    }

    public selectItem(elSelected: any) {
        const result = elSelected.item;
        if (this.required) {
            this.showRequiredError = false;
        }
        this.ngModelChange.emit(this.optionValue ? result[this.optionValue] : result)
    }

    public displayError() {
        if (!this.ngModel) {
            this.searchText = '';
            if (this.ngbInputComponent.dirty && this.required) {
                this.showRequiredError = true;
            }
        }
    }
}
