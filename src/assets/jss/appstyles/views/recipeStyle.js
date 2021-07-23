const recipeStyle = (theme) => ({
    infoHeader: {
        margin : "15px 0px",
    },
    desc: {
        whiteSpace: "pre-wrap"
    },
    imagePreview: {
        width: "100%",
        position: "relative",
        borderRadius: "8px",
        maxHeight: "400px",
        objectFit: "cover",
        margin: "8px 81px 0px 8px",
        [theme.breakpoints.down("sm")]: {
            margin: 0,
            borderRadius: "0px",
        }
    },
});

export default recipeStyle;
