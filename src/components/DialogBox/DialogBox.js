import PropTypes from "prop-types";

import Button from "../../components/CustomButtons/Button.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// ::::::::  NOTE  :::::::::::
// actions = [
// {
//     btnText: "OK",
//     onClick: onClickFunc,
//     btnColor: "success",
// },
// {
//     btnText: "Cancel",
//     onClick: onClickFunc,
//     btnColor: "danger",
// },
// ]

export default function DialogBox(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.actions.map(function (action, key) {
                    return (
                        <Button onClick={action.onClick} key={key} color={action.btnColor} >
                            {action.btnText}
                        </Button>
                    );
                })}
            </DialogActions>
        </Dialog>
    );
}

DialogBox.propTypes = {
    open: PropTypes.bool,
    actions: PropTypes.array,
    onClose: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string,
}