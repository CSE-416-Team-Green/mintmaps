import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import MapContext from "./MapContext";
import { useContext, useState } from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import {
    Modal,
    Container,
    Stack,
    TextField,
    Paper,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";

const FloatingActionButton = () => {
    const mapContext = useContext(MapContext);
    const [openModal, setOpenModal] = useState(false);
    const [propertyName, setPropertyName] = useState("");
    const [initialValue, setInitialValue] = useState("");
    const [badProp, setbadProp] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleActionClick = (actionName: string) => {
        if (actionName === "Undo" && mapContext.canUndo) {
            mapContext.undo();
        } else if (actionName === "Redo" && mapContext.canRedo) {
            mapContext.redo();
        }
    };

    const handleAddProperty = () => {
        if (mapContext.mapType !== "point") {
            if (propertyName && initialValue) {
                mapContext.addNewProperty(propertyName, initialValue);
                setOpenModal(false); // Close the modal after adding
                setPropertyName(""); // Reset the form
                setInitialValue("");
                setSuccess(true);
            } else {
                setbadProp(true);
            }
        } else {
            if (propertyName) {
                mapContext.setPointIntake(propertyName);
                setOpenModal(false); // Close the modal after adding
                setPropertyName(""); // Reset the form
                setInitialValue("");
            } else {
                setbadProp(true);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === "propertyName") {
            setPropertyName(value);
        } else if (id === "initValue") {
            setInitialValue(value);
        }
    };

    const actionStyle = (canPerformAction: any) => ({
        color: canPerformAction ? "inherit" : "grey",
        pointerEvents: canPerformAction ? "auto" : "none",
    });
    return (
        <>
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
                    <SpeedDialAction
                        key="Add Prop"
                        icon={<AddLocationAltIcon />}
                        onClick={() => setOpenModal(true)}
                        tooltipTitle="Add Property"
                    />
                </SpeedDial>
            </Box>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Container sx={{ width: 500, mt: 20 }}>
                    <Paper elevation={1} sx={{ pt: 5, pb: 5 }}>
                        <Container>
                            <Paper elevation={3}>
                                <Stack direction={"column"} spacing={2}>
                                    <TextField
                                        id="propertyName"
                                        label="Property Name"
                                        variant="outlined"
                                        value={propertyName}
                                        onChange={handleChange}
                                    />
                                    {mapContext.mapType !== "point" && (
                                        <TextField
                                            id="initValue"
                                            label="initValue"
                                            variant="outlined"
                                            value={initialValue}
                                            onChange={handleChange}
                                        />
                                    )}
                                    <Button onClick={handleAddProperty}>
                                        Add
                                    </Button>
                                </Stack>
                            </Paper>
                        </Container>
                    </Paper>
                </Container>
            </Modal>
            <Snackbar
                open={badProp}
                autoHideDuration={6000}
                onClose={() => setbadProp(false)}
            >
                <Alert
                    onClose={() => setbadProp(false)}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    Please add all relevant info to the new property
                </Alert>
            </Snackbar>
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
            >
                <Alert
                    onClose={() => setSuccess(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    New Property Sucessfully Added!
                </Alert>
            </Snackbar>
        </>
    );
};

export default FloatingActionButton;
