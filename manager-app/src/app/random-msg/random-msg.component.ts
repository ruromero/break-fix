import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-random-msg',
  templateUrl: './random-msg.component.html',
  styleUrls: ['./random-msg.component.css']
})
export class RandomMsgComponent implements OnInit {

  messages: Array<string> = [
    "Staring at the keyboard",
    "Copy&Pasting from StackOverflow",
    "Mixing wine with coke",
    "Turning it off an on again",
    "Yelling at the intern",
    "Holding my pee nerviously",
    "Browsing porn anonymously",
    "Procrastinating",
    "Starting another project I'll never finish",
    "I don't know why I am still making you wait",
    "Cleaning up the coffee I just spilled",
    "Doing science, b...!"
  ];

  message: string;

  constructor() { }

  ngOnInit() {
    this.setRandomMsg();
    setInterval(this.setRandomMsg, 2000);
  }

  setRandomMsg = () => {
    this.message = this.messages[Math.floor(Math.random() * this.messages.length)];
  }

}
