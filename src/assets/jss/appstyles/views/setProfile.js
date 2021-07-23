import {
    // primaryColor,
    blackColor,
    hexToRgb
} from "../../style.js";

const setProfileStyle = () => ({
    root: {
        margin: "0 20px !important",
    },
    image: {
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 0px",
        alignText: "center"
    },
    profileImage: {
        width: "150px",
        height: "150px",
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
    profileFooter: {
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "flex-end",
        borderTop: "1px solid grey"
    },

    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    selectImage: {
        marginTop: "10px",
        border: "1px solid #DEDEDE",
        borderRadius: "5px",
        padding: "10px",
    },
    imagePreview: {
        display: "block",
        width: "100%",
        height: "150px",
        objectFit: "contain",
    },

});

export default setProfileStyle;
