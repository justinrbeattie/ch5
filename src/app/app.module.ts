import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridTestComponent } from './test-components/grid-test/grid-test.component';
import { GridComponent } from './shared/grid/grid.component';
import { CellComponent } from './shared/grid/cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    GridTestComponent,
    GridComponent,
    CellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
