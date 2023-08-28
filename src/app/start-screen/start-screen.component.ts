import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'; //! need constructor!
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);
  collectionInstance = collection(this.firestore, 'games');

  constructor(private router: Router){}

  newGame(){
    let game = new Game();

    const coll = collection(this.firestore, 'games');
    addDoc(coll, {game: game.toJson()}).then((gameInfo:any ) =>{
      console.log(gameInfo.id);
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }
}