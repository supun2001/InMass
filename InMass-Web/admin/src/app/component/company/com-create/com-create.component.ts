import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-com-create',
  templateUrl: './com-create.component.html',
  styleUrls: ['./com-create.component.css']
})
export class ComCreateComponent implements OnInit {
  company: Company = new Company();
  selectedFile: File | undefined;
  error: string | undefined;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id !== undefined) {
        this.companyService.getCompany(id).subscribe(
          (res: any) => {
            if (res.success) {
              console.log(res);
              this.company = res.company;
            } else {
              console.error(res.message);
            }
          },
          (error) => {
            console.error('Error fetching company data:', error);
          }
        );
      }
    });
  }

  handleFileInput(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
      console.log(this.selectedFile);
    }
  }

  SaveData(form: NgForm) {
    if (form.valid) {
      if (this.company._id !== undefined) {
        // Update an existing company
        if (this.selectedFile !== undefined) { // Check if selectedFile is defined
          this.companyService.updateCompany(this.company, this.selectedFile).subscribe(
            (res) => {
              if (res.status === 200) {
                this.router.navigate(['/company']);
              }
            },
            (error) => {
              this.error = 'Error updating company: ' + error.message;
            }
          );
        } else {
          // Handle the case where a file was not selected for an update
          console.error('No file selected for update');
        }
      } else {
        // Create a new company
        if (this.selectedFile !== undefined) { // Check if selectedFile is defined
          this.companyService.addCompany(this.company, this.selectedFile).subscribe(
            (res) => {
              if (res.status === 201) {
                this.router.navigate(['/company']);
              }
            },
            (error) => {
              this.error = 'Error creating company: ' + error.message;
            }
          );
        } else {
          // Handle the case where a file was not selected for a new company
          console.error('No file selected for new company');
        }
      }
    }
  }
}
