import { Component, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-av-example',
  templateUrl: './av-example.component.html',
  styleUrls: ['./av-example.component.scss']
})
export class AvExampleComponent implements AfterViewInit {
  @ViewChild('sidenavContent') sidenavContent: CdkScrollable;
  currentComponent: any;
  scrollPosition: number = 0;
  scrollDirection: string;
  shrinkHero: boolean = false;
  heroTemplate:any;

  constructor(private scrollDispatcher: ScrollDispatcher, private renderer: Renderer2) {

  }

  ngAfterViewInit() {
    this.scrollDispatcher.scrolled().subscribe(() => {
      const scrollPosition = this.sidenavContent.measureScrollOffset('top');
      this.renderer.setAttribute(document.body, 'style', `--scroll-position:${scrollPosition};`);
      const scrollDirection = (scrollPosition > this.scrollPosition) ? 'scrolling-down' : 'scrolling-up';
      this.scrollPosition = scrollPosition;
      const shrinkHero = scrollPosition >= (window.innerHeight * .4) - 128;
      shrinkHero ? this.renderer.addClass(document.body, 'shrink-hero') : this.renderer.removeClass(document.body, 'shrink-hero');


      if (scrollDirection != this.scrollDirection) {
        this.scrollDirection = scrollDirection;
        this.renderer.removeClass(document.body, 'scrolling-up');
        this.renderer.removeClass(document.body, 'scrolling-down');
        this.renderer.addClass(document.body, this.scrollDirection);
      }

    });

  }

  async componentAdded(component) {
    this.currentComponent = component;
    setTimeout(()=>{this.heroTemplate = component.heroTemplate;}, 0);
   
  }

  componentRemoved($event) {
    console.log($event);
  }

}
