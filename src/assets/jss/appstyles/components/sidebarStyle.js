import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  primaryColor,
  // primaryBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb
} from "../../style.js";

const sidebarStyle = theme => ({
  drawerPaper: {
    border: "none",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    zIndex: "1",
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "fixed",
      height: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
      ...boxShadow,
      position: "fixed",
      display: "block",
      top: "0",
      height: "100vh",
      right: "0",
      left: "auto",
      zIndex: "1032",
      visibility: "visible",
      overflowY: "visible",
      borderTop: "none",
      textAlign: "left",
      paddingRight: "0px",
      paddingLeft: "0",
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition
    }
  },
  logo: {
    position: "relative",
    padding: "15px 15px",
    zIndex: "4",
  },
  logoLink: {
    ...defaultFont,
    textTransform: "uppercase",
    padding: "5px 0",
    display: "block",
    fontSize: "18px",
    textAlign: "left",
    fontWeight: "400",
    lineHeight: "30px",
    textDecoration: "none",
    backgroundColor: "transparent",
    color: blackColor,
    "&:hover": {
      color: blackColor
    },
  },
  logoImage: {
    width: "30px",
    display: "inline-block",
    maxHeight: "30px",
    marginLeft: "10px",
    marginRight: "15px",
  },
  img: {
    width: "35px",
    top: "22px",
    position: "absolute",
    verticalAlign: "middle",
    border: "0"
  },
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset"
  },
  subList: {
    margin: "2px 10px 0",
    position: 'relative',
    overflow: 'hidden',
    maxHeight: 150,
    "&:hover": {
      overflowY: "auto",
    },
    borderTop: `1px solid ${grayColor[0]}`,
    borderBottom: `1px solid ${grayColor[0]}`
  },
  item: {
    position: "relative",
    display: "block",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      color: whiteColor
    }
  },
  itemLink: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "2px 10px 0",
    borderRadius: "5px",
    position: "relative",
    display: "block",
    padding: "5px 10px",
    backgroundColor: "transparent",
    ...defaultFont
  },
  itemIcon: {
    width: "24px",
    height: "30px",
    lineHeight: "30px",
    float: "left",
    marginRight: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.8)"
  },
  itemText: {
    ...defaultFont,
    margin: "0",
    lineHeight: "30px",
    fontSize: "14px",
    color: blackColor
  },
  listItemLink: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "2px 10px 0",
    borderRadius: "5px",
    position: "relative",
    display: "block",
    padding: "5px 10px",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "rgba(" + hexToRgb(grayColor[0]) + ", 0.5)",
    },
    ...defaultFont
  },
  listItemText: {
    ...defaultFont,
    margin: "0",
    lineHeight: "30px",
    fontSize: "14px",
    color: blackColor,
    alignText: "center"
  },
  whiteFont: {
    color: whiteColor
  },
  purple: {
    backgroundColor: primaryColor[0],
    // ...primaryBoxShadow,
    "&:hover,&:focus": {
      backgroundColor: primaryColor[0],
      // ...primaryBoxShadow
    }
  },
  blue: {
    backgroundColor: infoColor[0],
    // boxShadow:
    //   "0 12px 20px -10px rgba(" +
    //   hexToRgb(infoColor[0]) +
    //   ",.28), 0 4px 20px 0 rgba(" +
    //   hexToRgb(blackColor) +
    //   ",.12), 0 7px 8px -5px rgba(" +
    //   hexToRgb(infoColor[0]) +
    //   ",.2)",
    "&:hover,&:focus": {
      backgroundColor: infoColor[0],
      // boxShadow:
      //   "0 12px 20px -10px rgba(" +
      //   hexToRgb(infoColor[0]) +
      //   ",.28), 0 4px 20px 0 rgba(" +
      //   hexToRgb(blackColor) +
      //   ",.12), 0 7px 8px -5px rgba(" +
      //   hexToRgb(infoColor[0]) +
      //   ",.2)"
    }
  },
  green: {
    backgroundColor: successColor[0],
    // boxShadow:
    //   "0 12px 20px -10px rgba(" +
    //   hexToRgb(successColor[0]) +
    //   ",.28), 0 4px 20px 0 rgba(" +
    //   hexToRgb(blackColor) +
    //   ",.12), 0 7px 8px -5px rgba(" +
    //   hexToRgb(successColor[0]) +
    //   ",.2)",
    "&:hover,&:focus": {
      backgroundColor: successColor[0],
      // boxShadow:
      //   "0 12px 20px -10px rgba(" +
      //   hexToRgb(successColor[0]) +
      //   ",.28), 0 4px 20px 0 rgba(" +
      //   hexToRgb(blackColor) +
      //   ",.12), 0 7px 8px -5px rgba(" +
      //   hexToRgb(successColor[0]) +
      //   ",.2)"
    }
  },
  orange: {
    backgroundColor: warningColor[0],
    // boxShadow:
    //   "0 12px 20px -10px rgba(" +
    //   hexToRgb(warningColor[0]) +
    //   ",.28), 0 4px 20px 0 rgba(" +
    //   hexToRgb(blackColor) +
    //   ",.12), 0 7px 8px -5px rgba(" +
    //   hexToRgb(warningColor[0]) +
    //   ",.2)",
    "&:hover,&:focus": {
      backgroundColor: warningColor[0],
      // boxShadow:
      //   "0 12px 20px -10px rgba(" +
      //   hexToRgb(warningColor[0]) +
      //   ",.28), 0 4px 20px 0 rgba(" +
      //   hexToRgb(blackColor) +
      //   ",.12), 0 7px 8px -5px rgba(" +
      //   hexToRgb(warningColor[0]) +
      //   ",.2)"
    }
  },
  red: {
    backgroundColor: dangerColor[0],
    // boxShadow:
    //   "0 12px 20px -10px rgba(" +
    //   hexToRgb(dangerColor[0]) +
    //   ",.28), 0 4px 20px 0 rgba(" +
    //   hexToRgb(blackColor) +
    //   ",.12), 0 7px 8px -5px rgba(" +
    //   hexToRgb(dangerColor[0]) +
    //   ",.2)",
    "&:hover,&:focus": {
      backgroundColor: dangerColor[0],
      // boxShadow:
      //   "0 12px 20px -10px rgba(" +
      //   hexToRgb(dangerColor[0]) +
      //   ",.28), 0 4px 20px 0 rgba(" +
      //   hexToRgb(blackColor) +
      //   ",.12), 0 7px 8px -5px rgba(" +
      //   hexToRgb(dangerColor[0]) +
      //   ",.2)"
    }
  },
  sidebarWrapper: {
    position: "relative",
    height: "calc(100vh - 75px)",
    overflow: "auto",
    width: "225px",
    zIndex: "4",
    overflowScrolling: "touch",
    backgroundColor: "#EEEEEE",
  },
  activePro: {
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      width: "100%",
      bottom: "13px"
    }
  }
});

export default sidebarStyle;
