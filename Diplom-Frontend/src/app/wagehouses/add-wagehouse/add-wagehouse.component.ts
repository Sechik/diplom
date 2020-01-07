import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WagehousesClient } from 'src/app/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-wagehouse',
  templateUrl: './add-wagehouse.component.html',
  styleUrls: ['./add-wagehouse.component.scss']
})
export class AddWagehouseComponent implements OnInit {
  addWagehouseForm: FormGroup;
  message: string;

  constructor(private formBuilder: FormBuilder, private wagehousesClient: WagehousesClient, private router: Router) {
    this.addWagehouseForm = this.formBuilder.group({
      product: ['', Validators.required],
      cost: ['', Validators.required],
      status: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  addCustomer() {
    if (this.addWagehouseForm.valid) {
      this.wagehousesClient.postWagehouse(this.addWagehouseForm.value).subscribe(data => {
        this.message = 'Товар добавлен на склад';
        this.clearForm();
      });
    } else {
      this.message = 'Товар не добавлен на склад';
    }
  }

  private clearForm() {
    this.addWagehouseForm.setValue(
      { name: '',
        cost: '',
        status: ''
      });
  }

  toWagehouseList() {
    this.router.navigate(['list-wagehouse']);
  }
}
