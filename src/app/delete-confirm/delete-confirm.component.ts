import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AppComponent>) { }

  onYesClick(): void {
    this.dialogRef.close("Yes");
  }

  onNoClick(): void {
    this.dialogRef.close("No");
  }

  ngOnInit(): void {
  }

}
