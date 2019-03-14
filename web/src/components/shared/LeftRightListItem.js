import React, { Component } from 'react';

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const styles = {
    right: {
        float: 'right',
        marginRight: 10,
    },
};

class LeftRightListItem extends Component {
    render() {
        let props = { ...this.props };
        let key = Object.keys(this.props).includes('key')
            ? this.props.key
            : this.props.leftText + this.props.rightText;
        delete props.rightText;
        delete props.leftText;

        return (
            <ListItem key={key}>
                {this.props.leftIcon && <ListItemIcon>{this.props.leftIcon}</ListItemIcon>}
                <ListItemText
                    primary={
                        <span>
                            <span>{this.props.leftText}</span>
                            <span style={styles.right}>{this.props.rightText}</span>
                        </span>
                    }
                />
            </ListItem>       
        );
    }
}

export default LeftRightListItem;