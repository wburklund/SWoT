import React, { Component } from 'react';

import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import Subheader from 'material-ui/Subheader';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import { grey } from '@material-ui/core/colors';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';

import { EXERCISE_TYPES } from '../../constants';

const styles = {
    leftIcon: {
        width: '32px',
        height: '32px',
    },
};

class RoutineExerciseList extends Component {
    getImage = (type) => {
        if (EXERCISE_TYPES.indexOf(type) === -1) { 
            type = 'unknown';
        }
    }

    render() {
        return (
            <List>
                <Subheader>Exercises</Subheader>
                {this.props.exercises ? this.props.exercises.map((e, index) =>                     
                        <ListItem key={index}>
                            <ListItemIcon>
                                <img alt={e.type} 
                                    style={styles.leftIcon} 
                                    src={process.env.PUBLIC_URL + '/img/' + e.type.toLowerCase() + '.png'}
                                />
                            </ListItemIcon>
                            <ListItemText primary={e.name}/>
                            <ListItemSecondaryAction>
                                <IconMenu iconButtonElement={
                                    <IconButton touch={true} tooltipPosition="bottom-left">
                                        <MoreVertIcon color={grey[400]} />
                                    </IconButton>
                                }>
                                    <MenuItem onClick={() => this.props.onMoveUpClick(index)}>Move Up</MenuItem>
                                    <MenuItem onClick={() => this.props.onMoveDownClick(index)}>Move Down</MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => this.props.onDeleteClick(index)}>Delete</MenuItem>
                                </IconMenu>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ) : ''}

            </List>
        );
    }
}

export default RoutineExerciseList;
