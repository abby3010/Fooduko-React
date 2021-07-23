import React from 'react';
import PropTypes from "prop-types";

import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

export default function DataListInput(props) {
    return (
        <Autocomplete
            style={props.style}
            value={props.value}
            onChange={(event, newValue) => props.onChange(event, newValue)}
            id={props.id}
            className={props.className}
            options={props.options.map((option, i) => option)}

            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                    });
                }
                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.title;
            }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params}
                    label={props.label}
                    variant="outlined"
                    
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                />
            )}
        />
    );
}

DataListInput.propTypes = {
    value: PropTypes.string,
    options: PropTypes.array,
    label: PropTypes.string,
    onChange: PropTypes.func
}