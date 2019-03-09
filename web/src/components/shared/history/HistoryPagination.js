import React, { Component } from 'react';

import { black } from '@material-ui/core/colors';
import { Button } from '@material-ui/core/';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

const styles = {
    paginationButton: {
        color: black,
        width: 150,
    },
    buttonRow: {
        textAlign: 'center',
    },
};

class HistoryPagination extends Component {
    render() {
        return (
            <div style={styles.buttonRow}>
                <Button
                    onClick={this.props.onPreviousClick}
                    disabled={this.props.refreshing || this.props.start === 1}
                >
                    <HardwareKeyboardArrowLeft/>
                </Button>
                <Button 
                    disabled={true}
                    style={styles.paginationButton}
                >
                    {this.props.refreshing ? ' ' : 
                        this.props.total > 0 ? this.props.start + '-' + this.props.end + ' of ' + this.props.total : 'No Results'
                    }
                </Button>
                <Button 
                    onClick={this.props.onNextClick} 
                    disabled={this.props.refreshing || this.props.end === this.props.total}
                >
                    <HardwareKeyboardArrowRight/>
                </Button>
            </div>
        );
    }
}

export default HistoryPagination;