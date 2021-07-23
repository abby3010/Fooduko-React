/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import NavbarLinks from "../Navbars/NavbarLinks.js";
import FixedPlugin from "../FixedPlugin/FixedPlugin.js";

import styles from "../../assets/jss/appstyles/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  const [color, setColor] = React.useState("blue");
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const handleColorClick = color => {
    setColor(color);
  };

  const { logo, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      <FixedPlugin
        handleColorClick={handleColorClick}
        bgColor={color}
      />
      {
        routes.filter((prop) => { return prop.showInDrawer }).map((prop, key) => {
          var activePro = " ";
          var listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
          });
          return (
            <>
              <NavLink
                key={key.toString()}
                to={prop.layout + prop.path}
                className={activePro + classes.item}
                activeClassName="active"
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    />
                  )}
                  <ListItemText
                    primary={prop.name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>

              {(prop.listItems) && (prop.listItems.length > 0) ?
                <List className={classes.subList}>
                  {prop.listItems.map((item, i) => {
                    return (
                      <NavLink
                        key={i.toString() + item.name}
                        to={item.path}
                        className={activePro + classes.item}
                        activeClassName="active"
                      >
                        <ListItem button className={classes.listItemLink + classNames({
                          [" " + classes[color]]: activeRoute(item.path)
                        })}>
                          <ListItemText
                            primary={item.name}
                            className={classNames(classes.listItemText, classNames({
                              [" " + classes.whiteFont]: activeRoute(item.path)
                            }))}
                            disableTypography={true}
                          />
                        </ListItem>
                      </NavLink>
                    );
                  }
                  )}
                </List>
                : null}
            </>
          );
        })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="/"
        className={classNames(classes.logoLink)}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <NavbarLinks />
            {links}
          </div>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper)
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>

            {links}
          </div>
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
