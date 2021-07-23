import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

// core components
import styles from "../../assets/jss/appstyles/components/selectMenuStyle.js";
const useStyles = makeStyles(styles);

export default function SelectMenu(props) {
    const classes = useStyles();

    return (
            <Select
                className={classes.selectMenu}
                labelId="select-label"
                id="simple-select"
                value={props.value}
                onChange={props.handleChange}
                input={
                    <OutlinedInput
                        classes={{
                            notchedOutline: classes.notchedOutline,
                            outline: classes.outline
                        }}
                    />
                }
                required={props.required}
            >
                {props.items.map((item, key) => {
                    return <MenuItem key={key} value={item}>{item}</MenuItem>
                })}
            </Select>
    );
}

SelectMenu.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    handleChange: PropTypes.func,
    items: PropTypes.array,
};