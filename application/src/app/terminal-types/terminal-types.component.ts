import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TerminalTypesCrudService } from '../services/terminal-types-crud.service';
 import { HeaderComponent } from '../header/header.component';

  import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
 @Component({
  selector: 'app-terminal-types',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule,CommonModule],
  templateUrl: './terminal-types.component.html',
  styleUrls: ['./terminal-types.component.css']
})
export class TerminalTypesComponent implements OnInit {
  terminalTypesOptions: any[] = [];
  TerminalTypesListForm: FormGroup;
  button = "Add";
  header = "Add a new terminal type";
  id_terminalType: any;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private terminalTypesService: TerminalTypesCrudService,
    private dialog: MatDialog
  ) {
    this.TerminalTypesListForm = this.fb.group({
      terminalType: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.terminalTypesService.getTerminalTypes().subscribe((options: any[]) => {
      this.terminalTypesOptions = options;
      console.log('Terminal types options:', this.terminalTypesOptions);
    });
  }

  getTerminalTypes(): void {
    this.terminalTypesService.getTerminalTypes().subscribe({
      next: (data: any[]) => {
        this.terminalTypesOptions = data;
        console.log('Terminal types options:', this.terminalTypesOptions);
      },
      error: (error: any) => {
        console.error('Error fetching terminal types options:', error);
      }
    });
  }

  deleteTerminalType(id: number): void {
    this.terminalTypesService.deleteTerminalType(id).subscribe({
      next: (data: any) => {
        console.log('Delete terminal type successful:', data);
        this.getTerminalTypes();
        this._snackBar.open("Terminal type deleted", "OK", { duration: 5000 });
      },
      error: (error: any) => {
        console.error('Delete terminal type error:', error);
        alert("Error deleting terminal type, please try again");
      }
    });
  }

  updateTerminalType(id: any, formData: any): void {
    this.terminalTypesService.updateTerminalType(id, this.TerminalTypesListForm.value).subscribe({
      next: (data: any) => {
        console.log('Update terminal type successful:', data);
        this.getTerminalTypes();
        this.button = "Add";
        this.header = "Add a new terminal type";
        this._snackBar.open("Terminal type updated", "OK", { duration: 5000 });
      },
      error: (error: any) => {
        console.error('Update terminal type error:', error);
        alert("Error updating terminal type, please try again");
      }
    });
  }

  passTerminalType(id_terminalType: any) {
    const item = this.terminalTypesOptions.find(item => item.id_terminalType === id_terminalType);
    this.TerminalTypesListForm.setValue({
      terminalType: item.terminalType
    });
    this.button = "Update";
    this.header = "Update Terminal Type";
    this.id_terminalType = id_terminalType;
    window.scrollTo(0, 0);
  }

  TerminalTypeSubmit(): void {
    if (this.TerminalTypesListForm.valid) {
      if (this.button === "Update") {
        this.updateTerminalType(this.id_terminalType, this.TerminalTypesListForm.value);
        this.TerminalTypesListForm.reset();
      } else if (this.button === "Add") {
        const formData = this.TerminalTypesListForm.value;
        this.terminalTypesService.createTerminalType(formData).subscribe(
          (data: any) => {
            console.log('Create Terminal Type successful:', data);
            this.terminalTypesOptions.push(data);
            this.getTerminalTypes();
            this.TerminalTypesListForm.reset();
            this._snackBar.open("Terminal type created", "OK", { duration: 5000 });
          },
          (error: any) => {
            console.error('Create Terminal Type error:', error);
            alert("Error creating terminal type, please try again");
          }
        );
      }
    }
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogExampleComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.deleteTerminalType(id);
      }
    });
  }
}
