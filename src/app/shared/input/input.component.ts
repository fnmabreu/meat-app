import {
  Component,
  OnInit,
  Input,
  ContentChild,
  AfterContentInit
} from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'mt-app-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {
  @Input() label: string;
  @Input() errorMessage: string;

  input: any;

  @ContentChild(FormControlName) control: FormControlName;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    this.input = this.control;

    if (this.input === undefined) {
      throw new Error(
        'Esse componente precisa ser usado com uma diretiva FormControlName'
      );
    }
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }
}
