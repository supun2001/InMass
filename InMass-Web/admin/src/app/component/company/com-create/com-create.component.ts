import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from 'src/app/model/company.model';

@Component({
  selector: 'app-com-create',
  templateUrl: './com-create.component.html',
  styleUrls: ['./com-create.component.css']
})
export class ComCreateComponent implements OnInit{
  company:Company = new Company();
  constructor(){}

  ngOnInit(): void {
    
  }

  SaveData(form:NgForm){}

}
