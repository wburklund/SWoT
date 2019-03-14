import React, { Component } from 'react';

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { EXERCISE_TYPES } from '../../constants';

const styles = {
    leftIcon: {
        width: '32px',
        height: '32px',
    },
};

class RoutineExerciseListItem extends Component {
    render() {
        let exerciseImage = this.props.exercise.type;
        if (EXERCISE_TYPES.indexOf(exerciseImage) === -1) { 
            exerciseImage = 'unknown';
        }

        return(
            <ListItem key={this.props.exercise.name}>
                <ListItemIcon>
                    <img 
                        alt={this.props.exercise.type} 
                        style={styles.leftIcon} 
                        src={process.env.PUBLIC_URL + '/img/' + exerciseImage.toLowerCase() + '.png'}
                    />
                </ListItemIcon>
                <ListItemText primary={this.props.exercise.name}/>
            </ListItem>
        );
    }
}

export default RoutineExerciseListItem;
