import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WagehousesClient } from 'src/app/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-wagehouse',
  templateUrl: './edit-wagehouse.component.html',
  styleUrls: ['./edit-wagehouse.component.scss']
})
export class EditWagehouseComponent implements OnInit {
  editWagehouseForm: FormGroup;
  message: string;

  constructor(private formBuilder: FormBuilder, private wagehousesClient: WagehousesClient, private router: Router) {
    this.editWagehouseForm = this.formBuilder.group({
      product: ['', Validators.required],
      cost: ['', Validators.required],
      status: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  editWagehouse() {
    if (this.editWagehouseForm.valid) {
      this.wagehousesClient.postWagehouse(this.editWagehouseForm.value).subscribe(data => {
        this.message = 'Товар добавлен на склад';
        this.clearForm();
      });
    } else {
      this.message = 'Товар не добавлен на склад';
    }
  }

  private clearForm() {
    this.editWagehouseForm.setValue(
      { name: '',
        cost: '',
        status: ''
      });
  }

  toWagehouseList() {
    this.router.navigate(['list-wagehouse']);
  }
}
