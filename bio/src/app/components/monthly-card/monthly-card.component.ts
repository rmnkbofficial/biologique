import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monthly-card',
  templateUrl: './monthly-card.component.html',
  styleUrls: ['./monthly-card.component.css']
})
export class MonthlyCardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
