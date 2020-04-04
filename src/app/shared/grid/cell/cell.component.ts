import { Component, OnInit, ElementRef, Renderer2, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Cell, PositionTemplate, CellBreakpointTemplate, AppBreakpoints } from '../grid.model';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  currentBreakpoint: string;
  styles: string;
  cell: Cell;
  name: string;
  @Input() position: object;
  @Input() contentAlignment: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.getCurrentBreakpoint();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.cell = {
      name: this.name,
      contentAlignment: this.contentAlignment,
      position: this.getBreakpointValues(this.position),
    }
  }

  getCurrentBreakpoint() {
    const appBreakpoints: AppBreakpoints = { xs: false, sm: false, md: false, lg: false, xl: false };
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      Object.keys(result.breakpoints).forEach((key, i) => {
        appBreakpoints[Object.keys(appBreakpoints)[i]] = result.breakpoints[key];
      })
      this.currentBreakpoint = Object.keys(appBreakpoints).find(key => appBreakpoints[key] === true);
      if (this.cell) {
        this.setStyles();
      }
    });
  }

  getBreakpointValues(inputValue) {
    let outputValue: CellBreakpointTemplate = {
      xs: { x: null, y: null, size: null },
      sm: { x: null, y: null, size: null },
      md: { x: null, y: null, size: null },
      lg: { x: null, y: null, size: null },
      xl: { x: null, y: null, size: null }
    };

    if (inputValue) {
      if (this.hasValidBreakpoints(inputValue, outputValue)) {
        Object.keys(outputValue).forEach(key => {
          /* check inputValue for each breakpoint value, If not fallback to the first breakpoint value #mobileFirst */
          const currentValue = inputValue[key] ? inputValue[key] : inputValue[Object.keys(outputValue)[0]];
          outputValue[key] = this.isValidpositionTemplate(currentValue) ? currentValue : null;
        });
        return outputValue;
      } else if (this.isValidpositionTemplate(inputValue)) {
        outputValue = { xs: inputValue, sm: inputValue, md: inputValue, lg: inputValue, xl: inputValue };
        return outputValue;
      }

      !inputValue ? null : console.error(this.name + ' cell properties are invalid:' + inputValue);
      return outputValue;
    }
  }

  isValidpositionTemplate(inputValue) {
    const positionTemplate: PositionTemplate = { x: null, y: null, size: null };
    /*  if html attribute has a valid position template e.g. [position]="{ x: '', y: '', size: '' }"*/
    if (Object.keys(inputValue).length > 0 && Object.keys(inputValue).every(key => { return Object.keys(positionTemplate).indexOf(key) !== -1; })) {
      return true;
    } else {
      console.error(this.name + ' cell does not have a valid position template:' + inputValue);
      return false;
    }
  }

  hasValidBreakpoints(inputValue, outputValue) {
    /*  if html attribute is an object with at least one breakpoint e.g. [plscement]="{xs:{ x: '', y: '', size: '' }}"*/
    if (Object.keys(inputValue).length > 0 && Object.keys(inputValue).some(key => { return Object.keys(outputValue).indexOf(key) !== -1; })) {
      return true;
    } else {
      return false;
    }
  }

  setStyles() {
    const bp = this.currentBreakpoint;
    const styles =
      this.setCssVar('--col-start', this.cell.position[bp].x) +
      this.setCssVar('--col-span', this.cell.position[bp].size.charAt(0)) +
      this.setCssVar('--row-start', this.cell.position[bp].y) +
      this.setCssVar('--row-span', this.cell.position[bp].size.charAt(2));

    if (styles != this.styles) {
      this.renderer.setAttribute(this.elRef.nativeElement, 'style', styles);
      this.styles = styles;
    }
  }


  setCssVar(name, value) {
    if (value) {
      return name + ':' + value + ';'
    } else {
      return ' ';
    }
  }



}
