import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { CellComponent } from './grid/cell/cell.component';

@NgModule({
  declarations: [GridComponent,
    CellComponent,],
  imports: [
    CommonModule,
  ],
  exports: [
    GridComponent,
    CellComponent,
  ]
})
export class SharedModule { }
