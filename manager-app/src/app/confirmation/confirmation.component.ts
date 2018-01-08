import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['../app.component.css', './confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  @Input() message: string;
  @Input() confirmFn: Function;

  constructor() { }

  ngOnInit() {
  }

  confirm = () => {
    this.confirmFn(true);
  };

  cancel = () => {
    this.confirmFn(false);
  };

}
