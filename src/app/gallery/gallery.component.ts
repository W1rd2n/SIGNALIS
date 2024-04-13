import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  public numberArray: number[] = [];

  ngOnInit(): void {
    for (var i = 1; i <= 46; i++) {
      this.numberArray.push(i);
    }
  }
}
