import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharactersComponent } from './characters/characters.component';
import { GalleryComponent } from './gallery/gallery.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'characters',
    component: CharactersComponent,
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
];
