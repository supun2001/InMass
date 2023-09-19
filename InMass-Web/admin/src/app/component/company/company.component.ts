import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/model/company.model';
import { CompanyService } from 'src/app/service/company.service';
import { environment as env} from 'src/environments/environment';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companies: Company[] = [];
  c_image: string = '';
  errorMzg:string='';

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(
      (res: Company[]) => {
        // Assuming companies have a property called c_logo with the filename
        this.c_image =env.imag_url;
        this.companies = res;
        console.log(this.c_image + this.companies[3]?.c_logo);
      },
      (error) => {
        console.error('Error fetching companies:', error);
        this.errorMzg = "Login was expired"
        console.log(this.errorMzg)
      }
    );
  }
}
