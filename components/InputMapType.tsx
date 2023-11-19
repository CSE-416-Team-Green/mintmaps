import { Box, Chip } from '@mui/material';
import Image from 'next/image';

const maps = [
    {
        name: "Heat Map",
        image: "/heatmap-preview.png",
    },
    {
        name: "Proportional Symbol",
        image: "/proportional-preview.png",
    },
    {
        name: "Point Map",
        image: "/point-preview.png",
    },
    {
        name: "Choropleth",
        image: "/choropleth-preview.png",
    },
    {
        name: "Bivariate Choropleth",
        image: "/bi-choropleth-preview.png",
    },
]

const InputMapType = () => {

    function handleClick() {
        console.log("click");
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
        }}>
            <h1>Map Type</h1>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: '64px',
                rowGap: '64px',
                justifyContent: 'center',
            }}>
                {
                    maps.map((map) => {
                        return (
                            <Box
                                key={map.name}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    rowGap: '8px',
                                }}
                            >
                                <Image src={map.image} alt={map.name} width={280} height={200} />
                                <Chip onClick={handleClick} label={map.name} />
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default InputMapType;