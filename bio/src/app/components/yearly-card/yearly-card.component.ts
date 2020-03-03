import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yearly-card',
  templateUrl: './yearly-card.component.html',
  styleUrls: [
    './yearly-card.component.css',
    '../monthly-card/monthly-card.component.css'
  ]
})
export class YearlyCardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
