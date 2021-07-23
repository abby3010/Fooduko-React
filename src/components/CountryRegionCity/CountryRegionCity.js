import React from "react";

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import { makeStyles } from "@material-ui/core/styles";
import { TextField } from '@material-ui/core';

import styles from "../../assets/jss/appstyles/components/countryRegionCityStyle.js";

const useStyles = makeStyles(styles);

export default function CountryRegionCity(props) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.regionWrapper}>
                Country*
                <CountryDropdown
                    className={classes.regionSelector}
                    value={props.country}
                    required
                    onChange={(val) => props.setCountry(val)} />
            </div>
            <div className={classes.regionWrapper} >
                Region/State*
                <RegionDropdown
                    className={classes.regionSelector}
                    country={props.country}
                    value={props.region}
                    required
                    onChange={(val) => props.setRegion(val)} />
            </div>
            <div className={classes.regionWrapper} >
                City*
                <TextField
                    style={{ padding: 0 }}
                    className={classes.regionSelector}
                    label="City Name"
                    variant="outlined"
                    value={props.city}
                    required
                    onChange={(event) => props.setCity(event.target.value)}
                />
            </div>
        </div>
    );
}