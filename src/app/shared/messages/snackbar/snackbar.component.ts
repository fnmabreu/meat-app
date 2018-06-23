import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello world!';
  
  constructor() { }

  ngOnInit() {
  }

}
