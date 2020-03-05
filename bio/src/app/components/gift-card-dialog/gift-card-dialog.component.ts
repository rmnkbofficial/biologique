import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gift-card-dialog',
  templateUrl: './gift-card-dialog.component.html',
  styleUrls: ['./gift-card-dialog.component.css']
})
export class GiftCardDialogComponent implements OnInit {
  giftForm: FormGroup;
  constructor() {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.giftForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      from: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }
}
