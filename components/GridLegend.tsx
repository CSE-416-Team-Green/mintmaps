import { interpolateColor, interpolateNumber } from '@/libs/interpolate';
import Sketch from '@/libs/sketch';
import { useEffect, useRef } from 'react';

interface ComponentProps {
    xValueMin: number;
    xValueMax: number;
    xColorMin: string;
    xColorMax: string;
    yValueMin: number;
    yValueMax: number;
    yColorMin: string;
    yColorMax: string;
    size?: number;
}

const GridLegend: React.FC<ComponentProps> = (props) => {
    const {
        xValueMin,
        xValueMax,
        xColorMin,
        xColorMax,
        yValueMin,
        yValueMax,
        yColorMin,
        yColorMax,
        size = 50
    } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {        
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const sketch = new Sketch(canvas);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const x = 32;
        const y = 32;

        for(let i = 0; i < canvas.width - size * 2; i += size) {
            ctx.fillStyle = interpolateColor(xColorMin, xColorMax, i / canvas.width);
            ctx.fillRect(i + x, y, size, Math.floor(canvas.height / size - 1) * size);
            sketch.text(i + x, y - 4, `${interpolateNumber(xValueMin, xValueMax, i / canvas.width)}`, {
                strokeStyle: '#000000',
                stroke: true,
                textAlign: 'left',
                textBaseline: 'bottom',
            });
        }

        for(let i = 0; i < canvas.height - size * 2; i += size) {
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = interpolateColor(yColorMin, yColorMax, i / canvas.width);
            ctx.fillRect(x, i + y, Math.floor(canvas.width / size - 1) * size, size);
            ctx.globalCompositeOperation = 'source-over';
            sketch.text(x - 4, i + y, `${interpolateNumber(yValueMin, yValueMax, i / canvas.width)}`, {
                strokeStyle: '#000000',
                stroke: true,
                textAlign: 'right',
                textBaseline: 'top',
            });
        }
    }, [props]);

    return (
        <canvas ref={canvasRef} width={320} height={320} />
    );
}

export default GridLegend;