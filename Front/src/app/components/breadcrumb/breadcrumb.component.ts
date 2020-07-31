import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor() { }

  @Input() home: string;
  @Input() panel: string;
  @Input() candidates: string;

  ngOnInit(): void {
  }

}
