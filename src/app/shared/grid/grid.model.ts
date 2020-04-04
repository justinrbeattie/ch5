
export interface AppBreakpoints {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
}

export interface GridTemplate {
    name?: string,
    cols?: GridBreakpointTemplate;
    colTemplate?: GridBreakpointTemplate;
    colGap?: GridBreakpointTemplate;
    rows?: GridBreakpointTemplate;
    rowTemplate?: GridBreakpointTemplate;
    rowGap?: GridBreakpointTemplate;
}

export interface GridBreakpointTemplate {
    xs: any;
    sm: any;
    md: any;
    lg: any;
    xl: any;
}


export interface CellBreakpointTemplate {
    xs: PositionTemplate;
    sm: PositionTemplate;
    md: PositionTemplate;
    lg: PositionTemplate;
    xl: PositionTemplate;
}

export interface Cell {
    name?: string,
    position?: CellBreakpointTemplate,
    contentAlignment?: string;
}

export interface PositionTemplate {
    x?: string,
    y?: string,
    size?: string
}

