import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/model/jobs.model';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-jobs-create',
  templateUrl: './jobs-create.component.html',
  styleUrls: ['./jobs-create.component.css']
})
export class JobsCreateComponent implements OnInit{

  job: Job = new Job();
  selectedFile: File | undefined;
  error: string | undefined;

  constructor(
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ){}

    ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id !== undefined) {
        this.jobService.getJob(id).subscribe(
          (res: any) => {
            if (res.success) {
              console.log(res);
              this.job = res.job;
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
      if (this.job._id !== undefined) {
        // Update an existing company
        if (this.selectedFile !== undefined) { // Check if selectedFile is defined
          this.jobService.updateJob(this.job, this.selectedFile).subscribe(
            (res) => {
              if (res.status === 200) {
                this.router.navigate(['/jobs']);
              }
            },
            (error) => {
              this.error = 'Error updating job: ' + error.message;
            }
          );
        } else {
          // Handle the case where a file was not selected for an update
          console.error('No file selected for update');
        }
      } else {
        // Create a new company
        if (this.selectedFile !== undefined) { // Check if selectedFile is defined
          this.jobService.addJob(this.job, this.selectedFile).subscribe(
            (res) => {
              if (res.status === 201) {
                this.router.navigate(['/jobs']);
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
