import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClothingStore-User';
  constructor(private router: Router, private dialog: MatDialog) {
    this.router.events.subscribe((val) => {
        this.dialog.closeAll()
    });
  }

}
