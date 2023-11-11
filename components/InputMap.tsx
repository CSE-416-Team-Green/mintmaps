import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const presetMaps = [
    "Select a preset map",
    "United States",
    "Canada",
    "Mexico",
    "United Kingdom",
    "France",
    "Germany",
    "Spain",
    "Italy",
]

const InputMap = () => {
    const [preset, setPreset] = React.useState<string>("Select a preset map");

    function handlePresetChange(event: SelectChangeEvent<string>) {
        setPreset(event.target.value as string);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
        }}>
            <h1>Upload a map file</h1>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: '64px',
            }}>
                <Box sx={{
                    backgroundColor: '#E0E0E0',
                    width: '800px',
                    height: '480px',
                }}></Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '16px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '12px',
                    }}>
                        <Button variant="contained" style={{
                            height: '48px',
                        }}>
                            UPLOAD GEOJSON/FILE
                        </Button>
                        .KML .SHP .GEOJSON or .MINTMAP file
                    </Box>
                    <Divider>or</Divider>
                    <FormControl fullWidth>
                        <InputLabel>Preset Map</InputLabel>
                        <Select
                            value={preset}
                            label="Preset Map"
                            onChange={handlePresetChange}
                        >
                            {presetMaps.map((presetMap) => {
                                return (
                                    <MenuItem key={presetMap} value={presetMap}>{presetMap}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default InputMap;