import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  public numberArray: number[] = [];

  ngOnInit(): void {
    for (var i = 1; i <= 44; i++) {
      this.numberArray.push(i);
    }
  }

  openModal(imageName: string) {
    const modal = document.getElementById('myModal') as HTMLDivElement;
    const modalImg = document.getElementById('img01') as HTMLImageElement;

    modal.style.display = 'block';
    modalImg.src = `../../assets/gallery/${imageName}`;
  }

  closeModal() {
    const modal = document.getElementById('myModal') as HTMLDivElement;
    modal.style.display = 'none';
  }
}
