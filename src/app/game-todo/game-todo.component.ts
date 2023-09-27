import { Component, Input } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game-todo',
  templateUrl: './game-todo.component.html',
  styleUrls: ['./game-todo.component.scss']
})
export class GameTodoComponent {
  cardAction = [
    { title: 'Waterfall', description: 'All players start drinking. In a clockwise direction, players may only stop drinking when the person sitting to the right of them has finished his waterfall. The player who draws the ace may stop drinking first (when he wants).' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' }, 
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Thumbmaster', description: 'Touch the tabletop with your thumb. The player who touches the table last must take a sip. drink.' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Rhyme', description: 'Pick a word. In a clockwise direction, the other players have to find a rhyme for it. Whoever repeats a word or can no longer name a new rhyme must drink a sip.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Rule', description: 'Think up a new rule that will apply until the end of the game. The rule may not override any other' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Kingscup', description: 'Pour a drink of your choice into the Kingscup. If the fourth king is drawn, the player must empty the Kingscup in the middle of the game.' },
  ];

  title = '';
  description = '';
  game: Game;
  @Input() card: string;
  @Input() players: any[] = [];



  ngOnChanges(): void {
    if (this.card) {
    let cardNumber = +this.card.split('_')[1];
    this.title = this.cardAction[cardNumber - 1].title;
    this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
