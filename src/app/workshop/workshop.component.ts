import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { JsonPipe } from '@angular/common';
import { ReplikaUnit } from '../characters/characters.tableUnitModel';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-workshop',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
  ],
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.css',
})
export class WorkshopComponent implements OnInit {
  @Output() unitAdded = new EventEmitter<any>();
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) public data: ReplikaUnit
  ) {
    console.log(data);
    this.myForm = this.fb.group({
      unitClass: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern(/^[A-Z]+$/),
        ],
      ],
      image: '',
      aliases: '',
      affiliation: 'AEON',
      occupation: '',
      species: 'Replika',
      gender: ['', [Validators.required, Validators.pattern('(Male|Female)')]],
      height: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(152),
          Validators.max(260),
        ],
      ],
    });

    this.handleEdit();
  }
  handleEdit() {
    this.myForm.patchValue(this.data);
  }

  ngOnInit(): void {
    // this.myForm.valueChanges.subscribe(console.log);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      if (this.myForm.get('unitClass')?.hasError('required')) {
        alert('Unit Class is required');
      }
      if (
        this.myForm.get('unitClass')?.hasError('minlength') ||
        this.myForm.get('unitClass')?.hasError('maxlength')
      ) {
        alert('Unit Class must be exactly 4 characters long');
      }
      if (this.myForm.get('unitClass')?.hasError('pattern')) {
        alert('Unit Class must contain only capital letters');
      }
      if (this.myForm.get('gender')?.hasError('required')) {
        alert('Gender is required');
      }
      if (this.myForm.get('gender')?.hasError('pattern')) {
        alert('Gender must be either Male or Female');
      }
      if (this.myForm.get('height')?.hasError('required')) {
        alert('Height is required');
      }
      if (this.myForm.get('height')?.hasError('min')) {
        alert('Height must be at least 152cm');
      }
      if (this.myForm.get('height')?.hasError('max')) {
        alert('Height must be at most 260cm');
      }
      return;
    }

    if (this.myForm.valid) {
      this.unitAdded.emit(this.myForm.value);
      console.log(this.myForm.value);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.myForm.patchValue({
      image: file,
    });
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const uplodedImage = e.srcElement.result;
      this.myForm.patchValue({
        image: uplodedImage,
      });
      console.log(e);
    };
    reader.readAsDataURL(file);
  }
}
