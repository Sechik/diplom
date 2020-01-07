import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrganizationsClient } from 'src/app/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.scss']
})
export class EditOrganizationComponent implements OnInit {

  editOrganizationForm: FormGroup;
  message: string;
  constructor(private formBuilder: FormBuilder, private organizationsClient: OrganizationsClient, private router: Router) { }

  ngOnInit() {
  }

  editOrganization() {
    if (this.editOrganizationForm.valid) {
      this.organizationsClient.postOrganization(this.editOrganizationForm.value).subscribe(data => {
        this.message = 'Организация изменена';
        this.clearForm();
      });
    } else {
      this.message = 'Организация не изменена';
    }
  }

  private clearForm() {
    this.editOrganizationForm.setValue(
      { name: '',
        address: '',
        phones: ''
      });
  }

  toOrganizationsList() {
    this.router.navigate(['list-organization']);
  }
}
