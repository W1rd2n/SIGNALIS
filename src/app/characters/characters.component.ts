import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { WorkshopComponent } from '../workshop/workshop.component';
import { ELEMENT_DATA, ELEMENT_DATA2 } from './characters.tableData';
import { ReplikaUnit } from './characters.tableUnitModel';

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
    'editColumn',
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

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialogService: MatDialog
  ) {}

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

  openDialog() {
    const dialogRef = this.dialogService.open(WorkshopComponent);

    dialogRef.componentInstance.unitAdded.subscribe((newUnit: any) => {
      this.dataSource.data.push(newUnit);
      this.dataSource._updateChangeSubscription();
      dialogRef.close();
    });
  }

  editReplika(unit: ReplikaUnit, index: number) {
    console.log(unit, index);

    const dialogRef = this.dialogService.open(WorkshopComponent, {
      data: unit,
    });

    dialogRef.componentInstance.unitAdded.subscribe((editedUnit: any) => {
      this.dataSource.data[index] = editedUnit;
      this.dataSource.data = [...this.dataSource.data];
      dialogRef.close();
    });
  }
}
