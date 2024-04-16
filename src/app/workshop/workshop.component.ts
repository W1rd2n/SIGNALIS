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
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
      image: '',
      aliases: '',
      affiliation: 'AEON',
      occupation: '',
      species: 'Replika',
      gender: ['', [Validators.required]],
      height: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
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
