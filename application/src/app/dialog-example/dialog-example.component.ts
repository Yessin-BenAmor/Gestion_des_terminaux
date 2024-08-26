import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule,MatDialogTitle,MatDialogContent,MatDialog,MatDialogActions } from '@angular/material/dialog';
   @Component({
  selector: 'app-dialog-example',
  standalone: true,
  imports : [MatButtonModule,MatDialogModule,MatDialogTitle,MatDialogContent,MatDialogContent,MatDialogActions],
    templateUrl: './dialog-example.component.html',
  styleUrl: './dialog-example.component.css'
})
export class DialogExampleComponent {
  constructor(public dialog : MatDialog) {}}
  
