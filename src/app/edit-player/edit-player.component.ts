import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  playerName: string;
  allProfilePictures = ['profile_m.png', 'profile_w.png'];
  selectedImage: string;



  constructor(
      public dialogRef: MatDialogRef<EditPlayerComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit(): void {
      this.playerName = this.data.playerName;
  }


  saveChanges() {
    this.dialogRef.close({
        playerName: this.playerName,
        playerImage: this.selectedImage
    });
}

}