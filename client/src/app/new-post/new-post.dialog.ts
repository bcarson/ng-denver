import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './new-post.dialog.html',
})
export class NewPostDialogComponent implements OnInit {
  private form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewPostDialogComponent>
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  save() {
    this.dialogRef.close({
      title: this.form.get('title').value,
      text: this.form.get('text').value,
    });
  }
}
