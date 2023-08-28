import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, doc, docData, updateDoc} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit{
  item$: Observable<any>;
  firestore: Firestore = inject(Firestore);
  gameId: string;
  game: Game;
  //pickCardAnimation: any;
  //currentCard: any;

constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    const itemCollection = collection(this.firestore, 'games');
    this.item$ = collectionData(itemCollection);
    this.item$.subscribe((game) => {
      console.log('gameInfo', game);
    });
  }


  ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params)=>{
      this.gameId = params['id'];
      const itemDoc = doc(this.firestore, 'games', this.gameId);
      
      docData(itemDoc).subscribe((game: any) => {
        this.game.players = game.game.players;
        this.game.currentPlayer = game.game.currentPlayer;
        this.game.stack = game.game.stack;
        this.game.pickCardAnimation = game.game.pickCardAnimation;
        this.game.currentCard = game.game.currentCard;
        this.game.playedCards = game.game.playedCards;
      });
    })
  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1200);
    }
  }


  editPlayer(playerID:number) {
    console.log('Edit Player', playerID);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(async name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }


async saveGame() {
  const itemDoc = doc(this.firestore, 'games', this.gameId);
  const cleanedGameData = JSON.parse(JSON.stringify(this.game.toJson()));
  await updateDoc(itemDoc, { game: cleanedGameData });
  console.log('update game', this.game);
}

/*
  async saveGame() {
    const itemDoc = doc(this.firestore, 'games', this.gameId);
    await updateDoc(itemDoc, { game: this.game.toJson() });
    console.log('update game', this.game);
  }
*/

}