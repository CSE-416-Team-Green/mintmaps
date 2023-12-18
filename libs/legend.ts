import { Legend } from '@/components/MapContext';
import Sketch from '@/libs/sketch';
import { interpolateColor, interpolateNumber } from '@/libs/interpolate';

export function drawLinearLegend(canvas: HTMLCanvasElement, legend: Partial<Legend>) {
    const size = 50;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const sketch = new Sketch(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < canvas.width - size; i += size) {
        ctx.fillStyle = interpolateColor(
            legend.colorMin!,
            legend.colorMax!,
            i / canvas.width
        );
        ctx.fillRect(i, 14, size, size);
        sketch.text(
            i,
            0,
            `${interpolateNumber(legend.valueMin!, legend.valueMax!, i / canvas.width).toFixed(1)}`,
            {
                strokeStyle: "#000000",
                stroke: true,
                textAlign: "left",
                textBaseline: "top",
            }
        );
    }
}

export function drawGridLegend(canvas: HTMLCanvasElement, legend: Partial<Legend>) {
    const size = 50;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const sketch = new Sketch(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const x = 64;
    const y = 32;

    for (let i = 0; i < canvas.width - size * 2; i += size) {
        ctx.fillStyle = interpolateColor(legend.xColorMin!, legend.xColorMax!, i / canvas.width);
        ctx.fillRect(i + x, y, size, Math.floor(canvas.height / size - 1) * size);
        sketch.text(i + x, y - 4, `${interpolateNumber(legend.xValueMin!, legend.xValueMax!, i / canvas.width).toFixed(1)}`, {
            strokeStyle: '#000000',
            stroke: true,
            textAlign: 'left',
            textBaseline: 'bottom',
        });
    }

    for (let i = 0; i < canvas.height - size * 2; i += size) {
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = interpolateColor(legend.yColorMin!, legend.yColorMax!, i / canvas.width);
        ctx.fillRect(x, i + y, Math.floor(canvas.width / size - 1) * size, size);
        ctx.globalCompositeOperation = 'source-over';
        sketch.text(x - 4, i + y, `${interpolateNumber(legend.yValueMin!, legend.yValueMax!, i / canvas.width).toFixed(1)}`, {
            strokeStyle: '#000000',
            stroke: true,
            textAlign: 'right',
            textBaseline: 'top',
        });
    }
}

export function drawCircleLegend(canvas: HTMLCanvasElement, legend: Partial<Legend>) {
    const interval = 4;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const sketch = new Sketch(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const x = canvas.width / 2;
    for (let i = interval; i > 0; i--) {
        const radius = interpolateNumber(legend.sizeMin!, legend.sizeMax!, i / interval);
        const y = canvas.height - radius;
        sketch.circle(x, y, {
            radius: interpolateNumber(legend.sizeMin!, legend.sizeMax!, i / interval),
            fillStyle: interpolateColor(legend.colorMin!, legend.colorMax!, i / interval),
            fill: true,
        });
        sketch.text(x, y - radius + 4, `${interpolateNumber(legend.valueMin!, legend.valueMax!, i / interval).toFixed(1)}`, {
            strokeStyle: '#000000',
            stroke: true,
            textAlign: 'center',
            textBaseline: 'top',
        });
    }
}