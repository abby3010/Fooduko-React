import {
  container,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor
} from "../../style.js";

const headerStyle = () => ({
  appBar: {
    minHeight: "50px",
    backgroundColor: "white",
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "sticky",
    width: "100%",
    zIndex: "1029",
    color: grayColor[7],
    padding: "8px 0",
    transition: "all 150ms ease 0s",
    // minHeight: "50px",
    display: "block"
  },
  container: {
    ...container,
    minHeight: "30px"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    letterSpacing: "unset",
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    margin: "0",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
  appResponsive: {
    top: "8px"
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  }
});

export default headerStyle;
