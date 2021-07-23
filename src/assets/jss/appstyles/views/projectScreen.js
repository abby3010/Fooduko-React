// import {
//    primaryColor,
//    blackColor,
//    hexToRgb
// } from "../../style.js";

const userProjectStyle = theme => ({

    image: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 0px",
    },
    projectImage: {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: "5px",
    },
    profileBody: {
        padding: "0px 10px",
        display: "flex",
        justifyContent: "center",
        wordBreak: "break-word",
    },
    profileFooter: {
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
        borderTop: "1px solid grey"
    },
    detailCards: {
        padding: "0px 20px",
        [theme.breakpoints.down("sm")]: {
            width: "-webkit-fill-available",
            padding: "0px 0px",
        },
    },
    cardTitle: {
        height: "100%",
        display: "flex",
        alignItems: "center",
    },
    education: {
        borderBottom: "1px solid grey",
    },
});

export default userProjectStyle;
