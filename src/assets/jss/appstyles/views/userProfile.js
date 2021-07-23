import {
    // primaryColor,
    blackColor,
    hexToRgb
} from "../../style.js";

const userProfileStyle = theme => ({

    image: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 0px",
    },
    profileImage: {
        width: "60%",
        height: "60%",
        objectFit: "contain",
        borderRadius: 100,
        // border: "1px solid grey",
        boxShadow:
            "0 16px 20px -12px rgba(" +
            hexToRgb(blackColor) +
            ", 0.56), 0 4px 25px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 10px 10px -5px rgba(" +
            hexToRgb(blackColor) +
            ", 0.2)",
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
    education : {
        borderBottom: "1px solid grey",
    },
});

export default userProfileStyle;
