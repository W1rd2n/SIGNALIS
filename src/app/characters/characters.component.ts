import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  unitClass: string;
  image: string;
  aliases: string;
  affiliation: string;
  occupation: string;
  species: string;
  gender: string;
  height: number;
}

export interface PeriodicElement2 {
  name: string;
  image: string;
  pkz: string;
  occupation: string;
  birthDate: string;
  birthPlace: string;
  species: string;
  gender: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    unitClass: 'LSTR',
    image: '../assets/characters/replika/LSTR.png',
    aliases: 'Landvermessungs, Schiff-Techniker Replika',
    affiliation: 'AEON',
    occupation:
      'Orbital Service, Penrose Program Spacecraft Technician, Combat Engineer, Sapper and Scout',
    species: 'Replika',
    gender: 'Female',
    height: 178,
  },
  {
    unitClass: 'FKLR',
    image: '../assets/characters/replika/FKLR.png',
    aliases: 'Kommando-Leiteinheit, Führungs Replika',
    affiliation: 'AEON',
    occupation: 'AEON Security Force Commander',
    species: 'Replika',
    gender: 'Female',
    height: 250,
  },
  {
    unitClass: 'ADLR',
    image: '../assets/characters/replika/ADLR.png',
    aliases: 'Administration, Datenverarbeitung, Logistik Replika',
    affiliation: 'AEON',
    occupation: 'Facility Administration',
    species: 'Replika',
    gender: 'Male',
    height: 175,
  },
  {
    unitClass: 'KLBR',
    image: '../assets/characters/replika/KLBR.png',
    aliases: 'Kommando-Leiteinheit, Bioresonanz Technik Replika',
    affiliation: 'AEON',
    occupation: 'Bioresonance Influence, Control and Coordination, FKLR Cadre',
    species: 'Replika',
    gender: 'Female',
    height: 152,
  },
  {
    unitClass: 'STAR',
    image: '../assets/characters/replika/STAR.png',
    aliases: 'Sicherheitstechniker, Aufseher Replika',
    affiliation: 'AEON',
    occupation: 'Protektor Security Technician, Riot Control',
    species: 'Replika',
    gender: 'Female',
    height: 220,
  },
  {
    unitClass: 'MNHR',
    image: '../assets/characters/replika/MNHR.png',
    aliases: 'Minenarbeit, Nukleartechniker, Hochsicherheits Replika',
    affiliation: 'AEON',
    occupation: 'Hazardous Environment Heavy Worker',
    species: 'Replika',
    gender: 'Female',
    height: 260,
  },
  {
    unitClass: 'ARAR',
    image: '../assets/characters/replika/ARAR.png',
    aliases: 'Allzweck, Reparatur, Arbeiter Replika',
    affiliation: 'AEON',
    occupation:
      'Repair, Maintenance, Construction, Production of Industrial Goods',
    species: 'Replika',
    gender: 'Female',
    height: 185,
  },
  {
    unitClass: 'EULR',
    image: '../assets/characters/replika/EULR.png',
    aliases: 'Einfache, Universelle, Leichte Replika',
    affiliation: 'AEON',
    occupation: 'Domestic, Office, Education, Simple Medical Tasks',
    species: 'Replika',
    gender: 'Female',
    height: 175,
  },
];

const ELEMENT_DATA2: PeriodicElement2[] = [
  {
    name: 'Ariane Yeong',
    image: '../assets/characters/gestalt/Ariane_Yeong.png',
    pkz: 'YNGARN-L-5921D',
    occupation: 'pilot of the Penrose 512',
    birthDate: '18S 6P a',
    birthPlace: 'Leng',
    species: 'Gestalt',
    gender: 'Female',
  },
  {
    name: 'Isolde_Itou',
    image: '../assets/characters/gestalt/Isolde_Itou.png',
    pkz: 'ITISLD-V-560524',
    occupation: 'shop assistant',
    birthDate: '14S 52P c',
    birthPlace: 'Vineta',
    species: 'Gestalt',
    gender: 'Female',
  },
  {
    name: 'Erika_Itou',
    image: '../assets/characters/gestalt/Erika_Itou.png',
    pkz: 'ITERIK-V-560524',
    occupation: 'university student',
    birthDate: '14S 52P c',
    birthPlace: 'Vineta',
    species: 'Gestalt',
    gender: 'Female',
  },
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-characters',
  styleUrl: 'characters.component.css',
  templateUrl: './characters.component.html',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
})
export class CharactersComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'unitClass',
    'image',
    'aliases',
    'affiliation',
    'occupation',
    'species',
    'gender',
    'height',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  displayedColumns2: string[] = [
    'name',
    'image',
    'pkz',
    'occupation',
    'birthDate',
    'birthPlace',
    'species',
    'gender',
  ];
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild('firstMatSort', { static: true })
  sort: MatSort = new MatSort();

  @ViewChild('secondMatSort', { static: true })
  sort2: MatSort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource2.sort = this.sort2;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
