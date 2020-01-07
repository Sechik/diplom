import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrganizationsClient } from 'src/app/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss']
})
export class AddOrganizationComponent implements OnInit {

  addOrganizationForm: FormGroup;
  message: string;

  constructor(private formBuilder: FormBuilder, private organizationsClient: OrganizationsClient, private router: Router) { }

  ngOnInit() {
  }

  addOrganization() {
    if (this.addOrganizationForm.valid) {
      this.organizationsClient.postOrganization(this.addOrganizationForm.value).subscribe(data => {
        this.message = 'Организация добавлена';
        this.clearForm();
      });
    } else {
      this.message = 'Организация не добавлена';
    }
  }

  private clearForm() {
    this.addOrganizationForm.setValue(
      { name: '',
        address: '',
        phones: ''
      });
  }

  toOrganizationsList() {
    this.router.navigate(['list-organization']);
  }

}
