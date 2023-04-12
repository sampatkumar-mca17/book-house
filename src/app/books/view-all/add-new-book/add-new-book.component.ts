import { Component, inject, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookCardDetails } from 'src/app/common-utils/interfaces';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.scss']
})
export class AddNewBookComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddNewBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ){}
    formGroup:FormGroup;
    formBuilder:FormBuilder =inject(FormBuilder);
    bookDetails: BookCardDetails;
    mode: "new" | "edit";
    newModeText = "Add new book"
    editModeText = "Update Book"
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.

      this.bookDetails = this.data.bookDetails
      this.mode = this.data.mode;
      this.formGroup = this.formBuilder.group(
        {
          title: [this.bookDetails?.title, Validators.required],
          imageUrl: [this.bookDetails?.imageUrl,Validators.required],
          publishDate: [this.bookDetails?.publishDate,Validators.required],
          purchaseLink: [this.bookDetails?.purchaseLink, Validators.required]
        }
      )
    }

}
