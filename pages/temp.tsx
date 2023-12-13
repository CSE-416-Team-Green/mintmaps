<>
<Header />
<br />
<Grid
    container
    direction={"row"}
    sx={{ width: "100%", height: "100%" }}
    justifyContent="left"
    alignItems={"left"}
>
    <Grid item xs={9}>
        <Grid
            container
            direction={"row"}
            sx={{
                width: "95%",
                height: "100%",
                position: "relative",
                left: "5%",
            }}
            justifyContent="left"
            alignItems={"left"}
        >
            <Grid item xs={12}>
                <Box
                    sx={{
                        height: "70vh",
                        width: "70vw",
                        display: "flex",
                    }}
                >
                    <DynamicMap />
                </Box>
            </Grid>

            <Grid
                item
                xs={9}
                sx={{
                    fontSize: "25px",
                    paddingBottom: "10px",
                    paddingTop: "4px",
                }}
            >
                <Typography variant="h4"> {mapTitle}</Typography>
            </Grid>
            <Grid item xs={1} sx={{ paddingTop: "12px" }}>
                <Typography variant="body2">
                    {" "}
                    {numViews} Views
                </Typography>{" "}
            </Grid>
            <Grid item xs={2} sx={{ paddingTop: "12px" }}>
                <Box sx={{ float: "right", paddingRight: "30px" }}>
                    <Typography variant="body2">
                        {" "}
                        {uploadDate}
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={0.75}>
                <IconButton href="/user-profile">
                    <Avatar />
                </IconButton>
            </Grid>
            <Grid item xs={8}>
                <Grid
                    container
                    direction={"row"}
                    sx={{ width: "100%", height: "100%" }}
                    justifyContent="left"
                    alignItems={"left"}
                >
                    <Grid item xs={1.25}>
                        Username
                    </Grid>
                    <Grid item xs={1.5}>
                        <Button
                            sx={{
                                height: 25,
                                width: 80,
                                fontSize: "10px",
                            }}
                            variant="contained"
                        >
                            Follow
                        </Button>
                    </Grid>
                    <Grid item xs={3} sx={{ fontSize: "10px" }}>
                        32 Followers
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={0.25}>
                <Box sx={{ float: "right", paddingRight: "10px" }}>
                    <Typography variant="body1">
                        {" "}
                        {numLikes}
                    </Typography>{" "}
                </Box>
            </Grid>
            <Grid item xs={0.25}>
                <ThumbUpIcon
                    sx={{
                        cursor: "pointer",
                    }}
                    htmlColor={liked ? "#2ecc71" : "#AAAAAA"}
                    onClick={handleLike}
                />
            </Grid>
            <Grid item xs={0.25} sx={{}}>
                <Box sx={{ float: "right", paddingRight: "3px"}}>
                    <Typography variant="body1">
                        {" "}
                        {numDisLikes}
                    </Typography>{" "}
                </Box>
            </Grid>
            <Grid item xs={0.25}>
                <ThumbDownIcon
                    sx={{
                        cursor: "pointer",
                    }}
                    htmlColor={disliked ? "#e74c3c" : "#AAAAAA"}
                    onClick={handleDislike}
                />
            </Grid>
            <Grid item xs={0.5}></Grid>
            <Grid item xs={2}>
                <Grid
                    container
                    direction={"row"}
                    sx={{ width: "100%", height: "100%" }}
                    justifyContent="left"
                    alignItems={"left"}
                >
                    <Grid item xs={3}>
                        <BookmarkIcon
                            sx={{
                                cursor: "pointer",
                            }}
                            htmlColor={
                                saved ? "#2ecc71" : "#AAAAAA"
                            }
                            onClick={handleSaveMap}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <DownloadIcon
                            sx={{
                                cursor: "pointer",
                            }}
                            onClick={handleDownload}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <ForkRightIcon
                            sx={{
                                cursor: "pointer",
                            }}
                            onClick={handleForkMap}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <ShareIcon></ShareIcon>
                    </Grid>
                </Grid>
            </Grid>

            <Grid
                item
                xs={12}
                sx={{ paddingTop: "30px", paddingBottom: "30px" }}
            >
                {mapDescription}
            </Grid>

            <Grid item xs={0.75}>
                Tag 1
            </Grid>
            <Grid item xs={0.75}>
                Tag 2
            </Grid>
            <Grid item xs={0.75}>
                Tag 3
            </Grid>
            <Grid item xs={0.75} sx={{ paddingBottom: "20px" }}>
                Tag 4
            </Grid>
            <Grid item xs={9}></Grid>

            <Grid item xs={0.5}>
                <IconButton href="/user-profile">
                    <Avatar />
                </IconButton>
            </Grid>
            <Grid item xs={10}>
                <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={1.5} sx={{ paddingLeft: "5px" }}>
                <Button
                    sx={{
                        height: 40,
                        width: 120,
                        fontSize: "12px",
                    }}
                    variant="contained"
                >
                    COMMENT
                </Button>
            </Grid>

            <Grid
                item
                xs={2}
                sx={{
                    fontSize: "25px",
                    paddingBottom: "10px",
                    paddingTop: "4px",
                }}
            >
                3 Comments
            </Grid>
            <Grid
                item
                xs={0.5}
                sx={{
                    fontSize: "25px",
                    paddingBottom: "10px",
                    paddingTop: "4px",
                }}
            >
                <SortIcon />
            </Grid>
            <Grid
                item
                xs={9.5}
                sx={{
                    fontSize: "25px",
                    paddingBottom: "10px",
                    paddingTop: "4px",
                }}
            >
                Sort By
            </Grid>

            <Grid item xs={0.5} sx={{ paddingTop: "10px" }}>
                <IconButton href="/user-profile">
                    <Avatar />
                </IconButton>
            </Grid>
            <Grid item xs={11.5} sx={{ paddingTop: "10px" }}>
                <Grid
                    container
                    direction={"row"}
                    sx={{ width: "100%", height: "100%" }}
                    justifyContent="left"
                    alignItems={"left"}
                >
                    <Grid item xs={1} sx={{}}>
                        Username
                    </Grid>
                    <Grid
                        item
                        xs={11}
                        sx={{ fontSize: "12px", paddingTop: "4px" }}
                    >
                        2 days ago
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sx={{
                            paddingBottom: "5px",
                            paddingTop: "5px",
                        }}
                    >
                        This map is very interesting! I learned a
                        lot!
                    </Grid>

                    <Grid item xs={0.25}>
                        <Box
                            sx={{
                                float: "right",
                                paddingRight: "10px",
                            }}
                        >
                            25
                        </Box>
                    </Grid>
                    <Grid item xs={0.25}>
                        <ThumbUpIcon />
                    </Grid>
                    <Grid item xs={0.25}>
                        <Box
                            sx={{
                                float: "right",
                                paddingRight: "10px",
                            }}
                        >
                            2
                        </Box>
                    </Grid>
                    <Grid item xs={0.25}>
                        <ThumbDownIcon />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={0.5} sx={{ paddingTop: "10px" }}>
                <IconButton href="/user-profile">
                    <Avatar />
                </IconButton>
            </Grid>
            <Grid item xs={11.5} sx={{ paddingTop: "10px" }}>
                <Grid
                    container
                    direction={"row"}
                    sx={{ width: "100%", height: "100%" }}
                    justifyContent="left"
                    alignItems={"left"}
                >
                    <Grid item xs={1} sx={{}}>
                        Username
                    </Grid>
                    <Grid
                        item
                        xs={11}
                        sx={{ fontSize: "12px", paddingTop: "4px" }}
                    >
                        2 days ago
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sx={{
                            paddingBottom: "5px",
                            paddingTop: "5px",
                        }}
                    >
                        This map is very interesting! I learned a
                        lot!
                    </Grid>

                    <Grid item xs={0.25}>
                        <Box
                            sx={{
                                float: "right",
                                paddingRight: "10px",
                            }}
                        >
                            25
                        </Box>
                    </Grid>
                    <Grid item xs={0.25}>
                        <ThumbUpIcon />
                    </Grid>
                    <Grid item xs={0.25}>
                        <Box
                            sx={{
                                float: "right",
                                paddingRight: "10px",
                            }}
                        >
                            2
                        </Box>
                    </Grid>
                    <Grid item xs={0.25}>
                        <ThumbDownIcon />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={0.5} sx={{ paddingTop: "10px" }}>
                <IconButton href="/user-profile">
                    <Avatar />
                </IconButton>
            </Grid>
            <Grid item xs={11.5} sx={{ paddingTop: "10px" }}>
                <Grid
                    container
                    direction={"row"}
                    sx={{ width: "100%", height: "100%" }}
                    justifyContent="left"
                    alignItems={"left"}
                >
                    <Grid item xs={1} sx={{}}>
                        Username
                    </Grid>
                    <Grid
                        item
                        xs={11}
                        sx={{ fontSize: "12px", paddingTop: "4px" }}
                    >
                        2 days ago
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sx={{
                            paddingBottom: "5px",
                            paddingTop: "5px",
                        }}
                    >
                        This map is very interesting! I learned a
                        lot!
                    </Grid>

                    <Grid item xs={0.25}>
                        <Box
                            sx={{
                                float: "right",
                                paddingRight: "10px",
                            }}
                        >
                            25
                        </Box>
                    </Grid>
                    <Grid item xs={0.25}>
                        <ThumbUpIcon />
                    </Grid>
                    <Grid item xs={0.25}>
                        <Box
                            sx={{
                                float: "right",
                                paddingRight: "10px",
                            }}
                        >
                            2
                        </Box>
                    </Grid>
                    <Grid item xs={0.25}>
                        <ThumbDownIcon />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    <Grid item xs={3}>
        <Box sx={{ paddingLeft: "20px", paddingBottom: "5px" }}>
            Reccomended
        </Box>
        <MapPreview />
        <MapPreview />
        <MapPreview />
        <MapPreview />
    </Grid>
</Grid>
</>