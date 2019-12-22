import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OperatorService} from "../services/operator.service";
import {Operator} from "../models/operator";

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  public operators: Operator[];

  constructor(private router: Router,
              private operatorService: OperatorService) {
  }

  ngOnInit() {
    this.operatorService.getOperators().subscribe(
      data => {
        this.operators = data;
      })

  }

}
