import { Accordion, AccordionDetails, AccordionSummary, Box, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MuiColorInput } from 'mui-color-input';
import { interpolateColor, interpolateNumber } from '@/libs/interpolate';
import Sketch from '@/libs/sketch';
import { useState, useEffect, useRef } from 'react';

const GridLegend = () => {
    const [xTitle, setXTitle] = useState('');
    const [yTitle, setYTitle] = useState('');
    const [xValueMin, setXValueMin] = useState(0);
    const [xValueMax, setXValueMax] = useState(256);
    const [xColorMin, setXColorMin] = useState('#FFFFFF');
    const [xColorMax, setXColorMax] = useState('#FF0000');
    const [yValueMin, setYValueMin] = useState(0);
    const [yValueMax, setYValueMax] = useState(256);
    const [yColorMin, setYColorMin] = useState('#FFFFFF');
    const [yColorMax, setYColorMax] = useState('#0000FF');
    
    const size = 50;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {        
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const sketch = new Sketch(canvas);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const x = 64;
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
    }, [
        xValueMin,
        xValueMax,
        xColorMin,
        xColorMax,
        yValueMin,
        yValueMax,
        yColorMin,
        yColorMax,
    ]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '16px',
            }}>
                <canvas ref={canvasRef} width={320} height={320} />
            </Box>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    X-axis Title
                </AccordionSummary>
                <AccordionDetails sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '16px',
                }}>
                    <TextField label="Title" variant="outlined" value={xTitle} onChange={(e) => setXTitle(e.target.value)} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Y-axis Title
                </AccordionSummary>
                <AccordionDetails sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '16px',
                }}>
                    <TextField label="Title" variant="outlined" value={yTitle} onChange={(e) => setYTitle(e.target.value)} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    X-axis Spectrum
                </AccordionSummary>
                <AccordionDetails sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '16px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '16px',
                        alignItems: 'center',
                    }}>
                        Min
                        <TextField type='number' label="Value" variant="outlined" value={xValueMin} onChange={(e) => setXValueMin(parseInt(e.target.value))} />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '16px',
                        alignItems: 'center',
                    }}>
                        Min
                        <MuiColorInput format='hex' value={xColorMin} onChange={setXColorMin} />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '16px',
                        alignItems: 'center',
                    }}>
                        Max
                        <TextField type='number' label="Value" variant="outlined" value={xValueMax} onChange={(e) => setXValueMax(parseInt(e.target.value))} />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '16px',
                        alignItems: 'center',
                    }}>
                        Max
                        <MuiColorInput format='hex' value={xColorMax} onChange={setXColorMax} />
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Y-axis Spectrum
                </AccordionSummary>
                <AccordionDetails sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '16px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '16px',
                        alignItems: 'center',
                    }}>
                        Min
                        <TextField type='number' label="Value" variant="outlined" value={yValueMin} onChange={(e) => setYValueMin(parseInt(e.target.value))} />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '16px',
                        alignItems: 'center',
                    }}>
                        Min
                        <MuiColorInput format='hex' value={yColorMin} onChange={setYColorMin} />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '16px',
                        alignItems: 'center',
                    }}>
                        Max
                        <TextField type='number' label="Value" variant="outlined" value={yValueMax} onChange={(e) => setYValueMax(parseInt(e.target.value))} />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        columnGap: '16px',
                        alignItems: 'center',
                    }}>
                        Max
                        <MuiColorInput format='hex' value={yColorMax} onChange={setYColorMax} />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default GridLegend;