import React, { Component } from 'react';

import { Button } from '@material-ui/core/'

class SaveRetryButton extends Component {
    render() {
        return (
            <Button 
                onClick={this.props.onClick} 
                disabled={
                    (Object.keys(this.props.validation)
                        .find(e => this.props.validation[e] !== '') !== undefined) || (this.props.api.isExecuting)
                }
                style={this.props.style}
            >
                {this.props.api.isErrored ? 'Retry' : this.props.label ? this.props.label : 'Save'}
            </Button>
        );
    }
}

export default SaveRetryButton;
