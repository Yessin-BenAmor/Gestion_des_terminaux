import { Component, OnInit } from '@angular/core';
 import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { SponsorCrudService } from '../services/sponsor-crud-service.service';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-sponsor',
  standalone: true,
  imports: [HeaderComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './sponsor.component.html',
  styleUrl: './sponsor.component.css'
})
export class SponsorComponent implements OnInit {
  sponsorOptions: any[] = [];
  sponsorForm: FormGroup;
  button = "Add";
  header = "Add a new sponsor";
  id_sponsor1: any;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private sponsorService: SponsorCrudService,
    private dialog: MatDialog
  ) {
    this.sponsorForm = this.fb.group({
      sponsor: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.sponsorService.getSponsors().subscribe((options: any[]) => {
      this.sponsorOptions = options;
      console.log('Sponsor options:', this.sponsorOptions);
    });
  }

  getSponsors(): void {
    this.sponsorService.getSponsors().subscribe({
      next: (data: any[]) => {
        this.sponsorOptions = data;
        console.log('Sponsor options:', this.sponsorOptions);
      },
      error: (error: any) => {
        console.error('Error fetching sponsor options:', error);
      }
    });
  }

  deleteSponsor(id: number): void {
    this.sponsorService.deleteSponsor(id).subscribe({
      next: (data: any) => {
        console.log('Delete sponsor successful:', data);
        this.getSponsors();
        this._snackBar.open("Sponsor deleted", "OK", { duration: 5000 });
      },
      error: (error: any) => {
        console.error('Delete sponsor error:', error);
        alert("Error deleting sponsor, please try again");
      }
    });
  }

  updateSponsor(id: any,formData: any): void {
    this.sponsorService.updateSponsor(id, this.sponsorForm.value).subscribe({
      next: (data: any) => {
        console.log('Update sponsor successful:', data);
        this.getSponsors();
        this.button = "Add";
        this.header = "Add a new sponsor";
        this._snackBar.open("Sponsor updated", "OK", { duration: 5000 });
      },
      error: (error: any) => {
        console.error('Update sponsor error:', error);
        alert("Error updating sponsor, please try again");
      }
    });
  }

  passSponsor(id_sponsor: any) {
    const item = this.sponsorOptions.find(item => item.id_sponsor === id_sponsor);
    this.sponsorForm.setValue({
      sponsor: item.sponsor
    });
    this.button = "Update";
    this.header = "Update Sponsor";
    this.id_sponsor1 = id_sponsor;
    window.scrollTo(0, 0);
  }

  OnSponsorSubmit(): void {
    if (this.sponsorForm.valid) {
      if (this.button === "Update") {
        this.updateSponsor(this.id_sponsor1,this.sponsorForm.value);
        this.sponsorForm.reset();
      } else if (this.button === "Add") {
        const formData = this.sponsorForm.value;
        this.sponsorService.createSponsor(formData).subscribe(
          (data: any) => {
            console.log('Create Sponsor successful:', data);
            this.sponsorOptions.push(data);
            this.getSponsors();
            this.sponsorForm.reset();
            this._snackBar.open("Sponsor created", "OK", { duration: 5000 });
          },
          (error: any) => {
            console.error('Create Sponsor error:', error);
            alert("Error creating Sponsor, please try again");
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
         this.deleteSponsor(id);
      }
    });
  }
}
