import { Component, OnInit } from '@angular/core';
import { TerminalCrudService } from '../services/terminal-crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { HeaderComponent } from '../header/header.component';
import { TerminalTypesCrudService } from '../services/terminal-types-crud.service';
@Component({
  selector: 'app-terminal-type',
  standalone: true,
  imports: [HeaderComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './terminal-type.component.html',
  styleUrls: ['./terminal-type.component.css']
})
export class TerminalTypeComponent implements OnInit {
  terminalOptions: any[] = [];
  terminalTypeForm: FormGroup;
  button = "Add";
  header = "Add a new terminal";
  id_tid1: any;
  id_terminal1 : any ; 
  terminalTypesOptions: any[]= [];
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private terminalTypeService: TerminalTypesCrudService,
    private terminalService: TerminalCrudService,
    private dialog: MatDialog
  ) {
    this.terminalTypeForm = this.fb.group({
      terminalType: ["", Validators.required],
      serialNumber: ["", Validators.required],
      profile: ["", Validators.required],
      TID: [],
      DB: ["", ],
      comment: ["",],
      wifiMacAddress: ["", ]
    });
  }

  ngOnInit(): void {
    this.terminalTypeService.getTerminalTypes().subscribe((options: any[]) => {
      this.terminalTypesOptions = options;
      console.log('Terminal options:', this.terminalTypesOptions);
    }
    );
     this.terminalService.getTerminal().subscribe(options => {
        this.terminalOptions = options;
        console.log('Terminal options:', this.terminalOptions);
      });
   }
  

  getTerminal(): void {
    this.terminalService.getTerminal().subscribe({
      next: data => {
        this.terminalOptions = data;
        console.log('Terminal options:', this.terminalOptions);
      },
      error: error => {
        console.error('Error fetching terminal options:', error);
      }
    });
  }
 
  deleteTerminal(id: any): void {
    this.terminalService.deleteTerminal(id,FormData).subscribe({
      next: data => {
        console.log('Delete terminal successful:', data);
        this.getTerminal();
        this._snackBar.open("Terminal deleted", "OK", { duration: 5000 });
      },
      error: error => {
        console.error('Delete terminal error:', error);
        alert("Error deleting terminal, please try again");
      }
    });
  }

  updateTerminal(id: any): void {
    this.terminalService.updateTerminal(id,FormData).subscribe({
      next: data => {
        console.log('Update terminal successful:', data);
        this.getTerminal();
        this._snackBar.open("Terminal updated", "OK", { duration: 5000 });
      },
      error: error => {
        console.error('Update terminal error:', error);
        alert("Error updating terminal, please try again");
      }
    });
  }



//passTerminal  type 
passTerminal(id_terminal: any) {
     const item = this.terminalOptions.find(item => item.id_terminal === id_terminal);
     this.terminalTypeForm.setValue({ 
        terminalType: item.terminalType,
        serialNumber: item.serialNumber,
        profile: item.profile,
        TID: item.TID,
        DB: item.DB,
        comment: item.comment,
        wifiMacAddress: item.wifiMacAddress
      });
      this.button = "Update";
      this.header = "Update Terminal " ; 
       this.id_terminal1 = id_terminal;
       window.scrollTo(0, 0);
    }

    

//onSubmit button
OnTerminalTypeSubmit():void {
  if (this.terminalTypeForm.valid && this.button === "Update") {
      const formData = this.terminalTypeForm.value;
    
      this.terminalService.updateTerminal(this.id_terminal1,formData).subscribe(
      (data: any) => {
         this.terminalTypeForm.reset();
        this._snackBar.open("Terminal updated", "OK",{duration: 5000});
        this.getTerminal();
        this.button = "Add";
        this.header = "Add a new terminal type";  
      },
      (error: any) => {
        console.log('Form submitted:', formData);

        console.error('Update Terminal error:', error);
        alert("Error updating Terminal, please try again");
      }
    );
  }
  else {
    if (this.terminalTypeForm.valid && this.button === "Add") { 


      const form = this.terminalTypeForm.value;
      console.log('Form submitted:', form);
      this.terminalService.createTerminal(form).subscribe(
        (data: any) => {
          console.log('Create Terminal successful:', data);
          this.terminalOptions.push(data);
          this.getTerminal();
          this.terminalTypeForm.reset();
          this._snackBar.open("Terminal created", "OK", { duration: 5000 });
        },
        (error: any) => {
          console.error('Create Terminal error:', error);
          alert("Error creating Terminal, please try again");
        }
      );  }

  }}



  openDialog(id: any): void {
    const dialogRef = this.dialog.open(DialogExampleComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.deleteTerminal(id);
      }
    });
  }
}