import { Component, AfterViewInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-av-example',
  templateUrl: './av-example.component.html',
  styleUrls: ['./av-example.component.scss']
})
export class AvExampleComponent implements AfterViewInit {
  @ViewChild('sidenavContent') sidenavContent: CdkScrollable;
  scrollPosition: number = 0;
  scrollDirection: string;

  constructor(private scrollDispatcher: ScrollDispatcher, public elref: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.scrollDispatcher.scrolled().subscribe(() => {
      const scrollPosition = this.sidenavContent.measureScrollOffset('top');
      this.renderer.setAttribute(document.body, 'style', `--scroll-position:${scrollPosition};`);
      const scrollDirection = (scrollPosition > this.scrollPosition) ? 'scrolling-down' : 'scrolling-up';
      this.scrollPosition = scrollPosition;
      if (scrollDirection != this.scrollDirection) {
        this.scrollDirection = scrollDirection;
        this.renderer.removeClass(document.body, 'scrolling-up');
        this.renderer.removeClass(document.body, 'scrolling-down');
        this.renderer.addClass(document.body, this.scrollDirection);
      }

    });

  }

}
