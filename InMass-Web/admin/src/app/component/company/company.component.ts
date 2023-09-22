import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/service/company.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, AfterViewInit {
  companies: Company[] = [];
  c_image: string = '';
  errorMzg: string = '';
  displayColumns: string[] = ['_id', 'c_name', 'c_logo', 'c_description', 'c_address', 'c_facebook', 'c_linkedin', 'hr_name', 'hr_email', 'hr_contact', 'action'];
  dataSource:MatTableDataSource<Company>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private companyService: CompanyService) {
    this.dataSource = new MatTableDataSource(this.companies);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
  // Use filter predicate to filter by c_name
  this.dataSource.filter = filterValue;
  
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


ngOnInit(): void {
  this.companyService.getCompanies().subscribe(
    (res: Company[]) => {
      this.c_image = env.imag_url;
      this.companies = res;
      // console.table(this.companies);
      
      // Initialize the MatTableDataSource with the companies data
      this.dataSource = new MatTableDataSource(this.companies);
      
      // Set the paginator and sort for the dataSource
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
      console.log(this.c_image + this.companies[3]?.c_logo);
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
      this.companyService.deleteUser(id).subscribe(res => {
        if (res.status == 200) {
          for (let i = 0; i < this.companies.length; i++) {
            if (id == this.companies[i]._id) {
              this.companies.splice(i, 1);
              window.location.reload()
              break;
            }
          }
        }
      });
    }
  }
}
