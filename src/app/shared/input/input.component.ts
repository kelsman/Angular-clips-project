import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
    @Input() control: FormControl = new FormControl();
    @Input() type: string = 'text';
    @Input() placeholder = '';
    @Input() format = '';

    constructor() {}

    ngOnInit(): void {}
}
