import React, { Component } from 'react';
import moment from 'moment';

import { Button } from '@material-ui/core/';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

const styles = {
    toolbar: {
        marginBottom: 16,
    },
    arrowButton: {
        minWidth: 50,
        width: 50,
    },
    date: {
        color: 'black',
        fontSize: 16,
    },
};

class WorkoutsCalendarToolbar extends Component {
    handlePreviousClick = () => {
        this.props.date.setMonth(this.props.date.getMonth() - 1);
        this.props.onNavigate('prev');
    };

    handleNextClick = () => {
        this.props.date.setMonth(this.props.date.getMonth() + 1);
        this.props.onNavigate('next');
    };

    handleTodayClick = () => {
        const now = new Date();
        this.props.date.setMonth(now.getMonth());
        this.props.date.setYear(now.getFullYear());
        this.props.onNavigate('current');
    };

    render() {
        return (
            <div style={styles.toolbar}>
                <Button 
                    style={styles.arrowButton} 
                    onClick={this.handlePreviousClick}
                >
                    <HardwareKeyboardArrowLeft/>
                </Button>
                <Button onClick={this.handleTodayClick}>
                    Today
                </Button>
                <Button 
                    style={styles.arrowButton} 
                    onClick={this.handleNextClick}
                >
                    <HardwareKeyboardArrowRight/>
                </Button>
                <Button disabled={true}>
                    <span style={styles.date}>
                        {moment(this.props.date).format('MMMM YYYY')}
                    </span>
                </Button>
            </div>
        );
    }
}

export default WorkoutsCalendarToolbar;