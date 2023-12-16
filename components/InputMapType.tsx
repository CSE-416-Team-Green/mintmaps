import { Box, Chip } from "@mui/material";
import Image from "next/image";
import React from "react";

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
];
interface InputMapTypeProps {
    onMapTypeSelect: (selectedMapType: string) => void;
}

const mapTypeConvert = (mapType: string) => {
    let type;
    switch (mapType) {
        case "Heat Map":
            type = "heat";
            break;
        case "Proportional Symbol":
            type = "proportional-symbol";
            break;
        case "Point Map":
            type = "point";
            break;
        case "Choropleth":
            type = "choropleth";
            break;
        case "Bivariate Choropleth":
            type = "bivariate-choropleth";
            break;
    }

    return type;
};

const InputMapType: React.FC<InputMapTypeProps> = ({ onMapTypeSelect }) => {
    const [selectedMapType, setSelectedMapType] = React.useState<string | null>(
        null
    );

    const handleClick = (mapName: string) => {
        const name = mapTypeConvert(mapName) as string;
        setSelectedMapType(name);
        onMapTypeSelect(mapName);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
            }}
        >
            <h1>Map Type</h1>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    columnGap: "64px",
                    rowGap: "64px",
                    justifyContent: "center",
                }}
            >
                {maps.map((map) => (
                    <Box
                        key={map.name}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            rowGap: "8px",
                        }}
                    >
                        <Image
                            src={map.image}
                            alt={map.name}
                            width={280}
                            height={200}
                        />
                        <Chip
                            onClick={() => handleClick(map.name)}
                            label={map.name}
                            sx={{
                                bgcolor:
                                    selectedMapType === map.name
                                        ? "grey.300"
                                        : undefined,
                                "&:hover": {
                                    bgcolor:
                                        selectedMapType === map.name
                                            ? "grey.400"
                                            : undefined,
                                },
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default InputMapType;
