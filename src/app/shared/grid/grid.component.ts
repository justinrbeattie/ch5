import { Component, OnInit, Input, OnChanges, ElementRef, Renderer2 } from '@angular/core';
import { GridTemplate, GridBreakpointTemplate, AppBreakpoints} from './grid.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {
  currentBreakpoint: string;
  styles: string;
  grid: GridTemplate;
  @Input() name: string;
  @Input() cols: any;
  @Input() colTemplate: any;
  @Input() colGap: any;
  @Input() rows: any;
  @Input() rowTemplate: any;
  @Input() rowGap: any;
  @Input() gap: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.getCurrentBreakpoint();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.grid = {
      name: this.name,
      cols: this.getBreakpointValues(this.cols),
      colTemplate: this.getBreakpointValues(this.colTemplate),
      colGap: this.colGap ? this.getBreakpointValues(this.colGap) : this.getBreakpointValues(this.gap),
      rows: this.getBreakpointValues(this.rows),
      rowTemplate: this.getBreakpointValues(this.rowTemplate),
      rowGap: this.rowGap ? this.getBreakpointValues(this.rowGap) : this.getBreakpointValues(this.gap),
    };
    this.setStyles();
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
      if (this.grid) {
        this.setStyles();
      }
    });
  }

  setStyles() {
    const bp = this.currentBreakpoint;
    const styles =
      this.setCssVar('--col-repeat', this.grid.cols[bp]) +
      this.setCssVar('--col-template', this.grid.colTemplate[bp]) +
      this.setCssVar('--col-gap', this.grid.colGap[bp]) +
      this.setCssVar('--row-repeat', this.grid.rows[bp]) +
      this.setCssVar('--row-template', this.grid.rowTemplate[bp]) +
      this.setCssVar('--row-gap', this.grid.rowGap[bp]);

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

  getBreakpointValues(inputValue) {
    let outputValue: GridBreakpointTemplate = { xs: null, sm: null, md: null, lg: null, xl: null };
    if (inputValue) {
      if (this.isString(inputValue)) {
        outputValue = { xs: inputValue, sm: inputValue, md: inputValue, lg: inputValue, xl: inputValue };
        return outputValue;
      } else if (this.hasValidBreakpoints(inputValue, outputValue)) {
        Object.keys(outputValue).forEach(key => {
          /* check inputValue for each breakpoint value, If not fallback to the first breakpoint value #mobileFirst */
          outputValue[key] = inputValue[key] ? inputValue[key] : inputValue[Object.keys(outputValue)[0]];
        });
        return outputValue;
      }
    } 
    
    !inputValue? null : console.error(this.name + ' Grid properties are invalid:' + inputValue);
    return outputValue;
  }

  isString(inputValue) {
    /* if html attribute is a string or number e.g. cols="3" [cols]="3" but not cols="{}"" */
    return (typeof inputValue == 'string' || typeof inputValue == 'number') && (!inputValue.toString().includes("{") || !inputValue.toString().includes(":"))
  }

  hasValidBreakpoints(inputValue, outputValue) {
    /*  if html attribute is an object with at least one breakpoint e.g. [cols]="{xs:3,sm:4,md:5,lg:6,xl:7}"*/
    if (Object.keys(inputValue).length > 0 && Object.keys(inputValue).some(key => { return Object.keys(outputValue).indexOf(key) !== -1; })) {
      return true;
    } else {
      console.error(this.name + ' Grid does not have any valid breakpoints:' + inputValue);
      return false;
    }
  }

}
