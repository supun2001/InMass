import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from 'src/app/model/jobs.model';
import { JobService } from 'src/app/service/job.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit{
  jobs:Job[]=[]
  j_image: string = '';
  errorMzg: string = '';
  displayColumns: string[] = ['_id', 'j_title', 'j_post', 'j_des', 'j_company', 'j_location', 'j_requirement', 'j_keywords','action'];
  dataSource:MatTableDataSource<Job>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private jobService:JobService){
    this.dataSource = new MatTableDataSource(this.jobs)
  }
    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    // Use filter predicate to filter by j_name
    this.dataSource.filter = filterValue;
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
  this.jobService.getJobs().subscribe(
    (res: Job[]) => {
      this.j_image = env.post_url;
      this.jobs = res;
      // console.table(this.companies);
      
      // Initialize the MatTableDataSource with the companies data
      this.dataSource = new MatTableDataSource(this.jobs);
      
      // Set the paginator and sort for the dataSource
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      console.log(this.j_image + this.jobs[3]?.j_post);
    },
    (error) => {
      console.error('Error fetching companies:', error);
      this.errorMzg = "Login was expired";
      console.log(this.errorMzg);
      }
    );
  }

  deleteUser(id: any) {
    if (confirm("Are you sure to delete?")) {
      this.jobService.deleteJob(id).subscribe(res => {
        if (res.status == 200) {
          for (let i = 0; i < this.jobs.length; i++) {
            if (id == this.jobs[i]._id) {
              this.jobs.splice(i, 1);
              window.location.reload()
              break;
            }
          }
        }
      });
    }
  }

}
