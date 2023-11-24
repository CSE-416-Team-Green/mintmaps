import { interpolateColor } from '@/libs/interpolate';
import { interpolateNumber } from '@/libs/interpolate';
import Sketch from '@/libs/sketch';
import React, { useRef, useEffect } from "react";

interface ComponentProps {
    valueMin: number;
    valueMax: number;
    colorMin: string;
    colorMax: string;
    sizeMin?: number;
    sizeMax?: number;
    interval?: number;
}

const CircleLegend: React.FC<ComponentProps> = (props) => {
    const {
        valueMin,
        valueMax,
        colorMin,
        colorMax,
        sizeMin = 0,
        sizeMax = 128,
        interval = 4,
    } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {        
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const sketch = new Sketch(canvas);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const x = canvas.width / 2;
        for(let i = interval; i > 0; i --) {
            const radius = interpolateNumber(sizeMin, sizeMax, i / interval);
            const y = canvas.height - radius;
            sketch.circle(x, y, {
                radius: interpolateNumber(sizeMin, sizeMax, i / interval),
                fillStyle: interpolateColor(colorMin, colorMax, i / interval),
                fill: true,
            });
            sketch.text(x, y - radius + 4, `${interpolateNumber(valueMin, valueMax, i / interval)}`, {
                strokeStyle: '#000000',
                stroke: true,
                textAlign: 'center',
                textBaseline: 'top',
            });
        }
    }, [props]);

    return (
        <canvas ref={canvasRef} width={256} height={256} />
    );
}

export default CircleLegend;