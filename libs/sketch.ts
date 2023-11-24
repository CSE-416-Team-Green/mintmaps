type CircleOptions = Partial<{
    radius: number;
    fill: boolean;
    stroke: boolean;
    fillStyle: string;
    strokeStyle: string;
    lineWidth: number;
}>;

type TextOptions = Partial<{
    font: string;
    fill: boolean;
    stroke: boolean;
    fillStyle: string;
    strokeStyle: string;
    lineWidth: number;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
}>;

type LineOptions = Partial<{
    stroke: boolean;
    strokeStyle: string;
    lineWidth: number;
}>;

const circleDefaults: CircleOptions = {
    radius: 10,
    fill: false,
    stroke: false,
    fillStyle: '#000000',
    strokeStyle: '#000000',
    lineWidth: 1,
}

const textDefaults: TextOptions = {
    font: '10px sans-serif',
    fill: false,
    stroke: false,
    fillStyle: '#000000',
    strokeStyle: '#000000',
    lineWidth: 1,
    textAlign: 'left',
    textBaseline: 'alphabetic',
}

const lineDefaults: LineOptions = {
    stroke: false,
    strokeStyle: '#000000',
    lineWidth: 1,
}

export default class Sketch {
    canvas; ctx;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    }
    circle(x: number, y: number, options: CircleOptions) {
        options = {...circleDefaults, ...options};
        this.ctx.beginPath();
        this.ctx.arc(x, y, options.radius!, 0, 2 * Math.PI);
        if(options.fill) {
            this.ctx.fillStyle = options.fillStyle!;
            this.ctx.fill();
        }
        if(options.stroke) {
            this.ctx.strokeStyle = options.strokeStyle!;
            this.ctx.lineWidth = options.lineWidth!;
            this.ctx.stroke();
        }
    }
    text(x: number, y: number, text: string, options: TextOptions) {
        options = {...textDefaults, ...options};
        this.ctx.font = options.font!;
        this.ctx.textAlign = options.textAlign!;
        this.ctx.textBaseline = options.textBaseline!;
        if(options.fill) {
            this.ctx.fillStyle = options.fillStyle!;
            this.ctx.fillText(text, x, y);
        }
        if(options.stroke) {
            this.ctx.strokeStyle = options.strokeStyle!;
            this.ctx.lineWidth = options.lineWidth!;
            this.ctx.strokeText(text, x, y);
        }
    }
    line(x1: number, y1: number, x2: number, y2: number, options: LineOptions) {
        options = {...lineDefaults, ...options};
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        if(options.stroke) {
            this.ctx.strokeStyle = options.strokeStyle!;
            this.ctx.lineWidth = options.lineWidth!;
            this.ctx.stroke();
        }
    }
}