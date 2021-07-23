import {
  primaryColor,
} from "../../style.js";

const userProjectsStyle = theme => ({

  // New Project Styling
  section: {
    alignItems: "center",
    justifyContent: "center"
  },
  newProjectBtn: {
    marginLeft: "5%"
  },
  margin: {
    zIndex: "4",
    margin: "0"
  },
  searchWrapper: {
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available",
      margin: "10px 15px 0"
    },
    display: "inline-block",
    float: "left",
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
  datalistInput: {
    marginTop: "10px",
    width: "100%",
  },
  textfield: {
    marginTop: "10px",
  },
  list: {
    width: "100%",
  },
  listItem: {
    borderRadius: 5,
    border: "1px solid" + primaryColor[0],
    padding: "3px 15px",
    marginTop: 2,
  },
  imageLabel: {
    marginTop: "10px",
    fontSize: 15,
    fontStyle: "bold"
  },
  imagePreview: {
    display: "block",
    width: "100%",
    height: "275px",
    objectFit: "contain",
  },
  selectImage: {
    marginTop: "10px",
    border: "1px solid #DEDEDE",
    borderRadius: "5px",
    padding: "10px",
  }
});

export default userProjectsStyle;