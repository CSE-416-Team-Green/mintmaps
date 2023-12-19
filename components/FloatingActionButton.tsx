import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import MapContext from "./MapContext";
import { useContext } from "react";

const actions = [
    { icon: <UndoIcon />, name: "Undo" },
    { icon: <RedoIcon />, name: "Redo" },
];

const FloatingActionButton = () => {
    const mapContext = useContext(MapContext);

    const handleActionClick = (actionName: string) => {
        if (actionName === "Undo" && mapContext.canUndo) {
            mapContext.undo();
        } else if (actionName === "Redo" && mapContext.canRedo) {
            mapContext.redo();
        }
    };

    const actionStyle = (canPerformAction: any) => ({
        color: canPerformAction ? 'inherit' : 'grey',
        pointerEvents: canPerformAction ? 'auto' : 'none',
    });
    return (
        <Box sx={{ height: 1, transform: "translateZ(0px)", flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="Map Editing Actions"
                sx={{ position: "absolute", bottom: 3, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                <SpeedDialAction
                    key="Undo"
                    icon={<UndoIcon />}
                    tooltipTitle="Undo"
                    onClick={() => handleActionClick("Undo")}
                    sx={actionStyle(mapContext.canUndo)}
                />
                <SpeedDialAction
                    key="Redo"
                    icon={<RedoIcon />}
                    tooltipTitle="Redo"
                    onClick={() => handleActionClick("Redo")}
                    sx={actionStyle(mapContext.canRedo)}

                />
            </SpeedDial>
        </Box>
    );
};

export default FloatingActionButton;
