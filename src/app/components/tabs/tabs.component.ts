import { Game } from 'src/app/services/module';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() game: Game;

  constructor() {}

  ngOnInit(): void {
    console.log(this.game);
  }
}
