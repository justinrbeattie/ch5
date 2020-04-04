import { Component, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  breakpoints: Array<string>;

  constructor(private breakpointObserver: BreakpointObserver, private renderer: Renderer2) {}

  ngOnInit() {
    this.addResponsiveClasses();
  }

  addResponsiveClasses() {
    this.breakpoints = Object.keys(Breakpoints);
    this.breakpoints.forEach(breakpoint => {
      this.breakpointObserver.observe([
        Breakpoints[`${breakpoint}`]
      ]).subscribe(result => {

        let className = this.formatClassName(breakpoint);

        if (result.matches) {
          this.renderer.addClass(document.body, className);
        } else {
          this.renderer.removeClass(document.body, className);
        }
      });
    });
  }

  formatClassName(breakpoint) {
    switch (breakpoint) {
      case 'XSmall':
        breakpoint = "xs";
        break;
      case 'Small':
        breakpoint = "sm";
        break;
      case 'Medium':
        breakpoint = "md";
        break;
      case 'Large':
        breakpoint = "lg";
        break;
      case 'XLarge':
        breakpoint = "xl";
        break;
      default:
        breakpoint = breakpoint.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
        breakpoint.charAt(0) === '-' ? breakpoint = breakpoint.substr(1) : null;
    }
    return breakpoint;
  }
}
