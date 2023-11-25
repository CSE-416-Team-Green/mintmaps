export function interpolateColor(c0: string, c1: string, f: number){
    c0 = c0.replace('#', '');
    c1 = c1.replace('#', '');

    const rgb0 = c0.match(/.{1,2}/g)?.map((oct)=>parseInt(oct, 16) * (1-f))
    const rgb1 = c1.match(/.{1,2}/g)?.map((oct)=>parseInt(oct, 16) * f)

    if (!rgb0 || !rgb1) return c0;

    const ci = [0,1,2].map(i => Math.min(Math.round(rgb0[i] + rgb1[i]), 255))
    return '#' + ci.reduce((a,v) => ((a << 8) + v), 0).toString(16).padStart(6, '0')
}

export function interpolateNumber(n0: number, n1: number, f: number){
    return n0 * (1-f) + n1 * f;
}