import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  checked = false;
  tasks = [{
    completed: true
  },
  { completed: false }]
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
  }
  deleteItem() {
    this.alertService.openAlertDelete()

  }

}
