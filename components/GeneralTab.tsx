import { Box, TextField, Chip, Button, TextareaAutosize } from "@mui/material";
import MapContext from "./MapContext";
import { useContext, useState, useEffect } from "react";

const GeneralTab = () => {
    const mapContext = useContext(MapContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        setTitle(mapContext.title);
        setDescription(mapContext.description);
        setTags(mapContext.tags);
    }, [mapContext.description, mapContext.title, mapContext.tags]);

    const changeTitle = (event: any) => {
        setTitle(event.target.value);
        mapContext.updateTitle(event.target.value);
    };

    const changeDesc = (event: any) => {
        setDescription(event.target.value);
        mapContext.updateDescription(event.target.value);
    };

    const addTag = () => {
        const newTags = tagInput.split(" ").filter((tag) => tag.trim() !== "");
        const allTags = [...tags, ...newTags];
        setTags(allTags);
        mapContext.updateTags([...allTags]);
        setTagInput("");
    };

    const onUpload = () => {
        mapContext.saveMap();
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "16px",
                    paddingBottom: "2rem",
                    width: "100%",
                }}
            >
                <TextField
                    label="Title"
                    data-cy="title-input"
                    variant="outlined"
                    value={title}
                    onChange={changeTitle}
                />
                <TextField
                    label="Description"
                    data-cy="description-input"
                    variant="outlined"
                    multiline
                    value={description}
                    onChange={changeDesc}
                />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "8px",
                    }}
                >
                    <TextField
                        sx={{
                            width: "100%",
                        }}
                        label="Add Tag"
                        data-cy="tag-input"
                        variant="outlined"
                        onChange={(e) => setTagInput(e.target.value)}
                        value={tagInput}
                    />
                    <Button
                        sx={{
                            height: "56px",
                        }}
                        variant="contained"
                        onClick={addTag}
                    >
                        Add
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        columnGap: "8px",
                        alignItems: "center",
                    }}
                >
                    Tags:
                    {tags.map((tagName) => (
                        <Chip label={tagName} />
                    ))}
                </Box>
            </Box>
            <Button data-cy="upload-button" variant="contained" href="map-upload" onClick={onUpload}>
                Upload
            </Button>
        </Box>
    );
};

export default GeneralTab;
