import React, { Component } from 'react';

import Spinner from '../shared/Spinner';

import { Button } from '@material-ui/core/';
import Dialog from 'material-ui/Dialog';
import { grey } from '@material-ui/core/colors';

const initialState = {
    api: {
        isExecuting: false,
        isErrored: false,
    },
};

class ConfirmDialog extends Component {
    state = initialState;

    componentWillReceiveProps = (nextProps) => {
        if (!this.props.open && nextProps.open) {
            this.setState(initialState);
        }
    }

    handleConfirmClick = () => {
        this.setState({ api: { ...this.state.api, isExecuting: true }}, () => {
            this.props.onConfirm()
            .then(response => { 
                this.props.onClose({ cancelled: false });
            }, error => {
                this.setState({ api: { isExecuting: false, isErrored: true }});
            });
        });
    }

    handleCancelClick = () => {
        this.setState(initialState, () => this.props.onClose({ cancelled: true }));
    }

    render() {
        let style = this.state.api.isExecuting ? { backgroundColor: grey[300] } : {};

        return (
            <div>
                <Dialog
                    bodyStyle={style}
                    contentStyle={style}
                    titleStyle={style}
                    actionsContainerStyle={style}
                    title={this.props.title}
                    actions={  
                        <div>          
                            <Button
                                disabled={this.state.api.isExecuting}
                                onClick={this.handleCancelClick}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={this.state.api.isExecuting}
                                onClick={this.handleConfirmClick}
                            >
                                {this.state.api.isErrored ? 'Retry' : this.props.buttonCaption}
                            </Button>
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                >
                    {this.props.children}
                    {this.state.api.isExecuting? <Spinner /> : ''}
                </Dialog>
            </div>
        );
    }
}

export default ConfirmDialog;

