import { Component, OnDestroy } from '@angular/core';
import { AddDetailsRequest } from '../models/add-details-request-model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css'],
})
export class AddDetailsComponent implements OnDestroy {
  model: AddDetailsRequest;
  private addDetailsSubscription?: Subscription;

  constructor(private detailsService: CategoryService) {
    this.model = {
      name: '',
      urlHandle: '',
    };
  }
  onFormDetailsSubmit() {
    this.addDetailsSubscription = this.detailsService
      .addDetails(this.model)
      .subscribe({
        next: (response) => {
          console.log('This was Successful');
        },
      });
  }

  ngOnDestroy(): void {
    this.addDetailsSubscription?.unsubscribe();
  }
}
