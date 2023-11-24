import { interpolateColor, interpolateNumber } from '@/libs/interpolate';
import Sketch from '@/libs/sketch';
import { useEffect, useRef } from 'react';

interface ComponentProps {
    valueMin: number;
    valueMax: number;
    colorMin: string;
    colorMax: string;
    size?: number;
}

const LinearLegend: React.FC<ComponentProps> = (props) => {
    const {
        valueMin,
        valueMax,
        colorMin,
        colorMax,
        size = 50,
    } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {        
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const sketch = new Sketch(canvas);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(let i = 0; i < canvas.width - size; i += size) {
            ctx.fillStyle = interpolateColor(colorMin, colorMax, i / canvas.width);
            ctx.fillRect(i, 14, size, size);
            sketch.text(i, 0, `${interpolateNumber(valueMin, valueMax, i / canvas.width)}`, {
                strokeStyle: '#000000',
                stroke: true,
                textAlign: 'left',
                textBaseline: 'top',
            });
        }
    }, [props]);

    return (
        <canvas ref={canvasRef} width={320} height={64} />
    );
}

export default LinearLegend;