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
    "Doing science, bitch!",
    "Running 'meltdown.sh'",
    "Running 'spectre.sh'",
    "Ooops I shouldn't have touched that",
    "I'm sorry, Dave, I'm afraid I can't do that",
    "Fear is the little-death that brings total obliteration",
    "I find your lack of faith disturbing",
    "You know kung fu",
    "Time...to break",
    "Keep calm and break OpenShift",
    "Mining bitcoins",
    "I am testing your patience",
    "The bits are flowing slowly today",
    "What do you call 8 Hobbits? A Hobbyte",
    "I swear it's almost done.",
    "Walking the dog",
    "Dividing by zero and multiplying by two",
    "Laughing at your pictures - I mean, loading...",
    "BRB, working on my side project",
    "@todo Insert witty loading message",
    "Compiling the Powerpoint",
    "Compiling some Javascript code"
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
