import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AvExampleRoutingModule } from './av-example-routing.module'; 
import { AvExampleComponent } from './av-example.component';
import { HomeComponent } from './home/home.component';
import { HeroComponent } from './hero/hero.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AvExampleRoutingModule
  ],
  declarations: [AvExampleComponent, HomeComponent, HeroComponent]
})
export class AvExampleModule { }
