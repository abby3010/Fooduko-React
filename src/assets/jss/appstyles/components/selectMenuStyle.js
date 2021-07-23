import {
    primaryColor,
} from "../../style.js";

const selectMenuStyle = {
    selectMenu: {
        minWidth: 200,
        margin: 10,
    },
    disabled: {
        "&:before": {
            backgroundColor: "transparent !important"
        }
    },
    notchedOutline: {
        borderWidth: "1px",
        borderColor: primaryColor[0]
    },
}

export default selectMenuStyle;