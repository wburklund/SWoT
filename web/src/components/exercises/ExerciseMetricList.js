import React, { Component } from 'react';

import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import Subheader from 'material-ui/Subheader';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {grey, black} from '@material-ui/core/colors';
import MenuItem from 'material-ui/MenuItem';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import { ContentCreate, ActionDelete } from 'material-ui/svg-icons';


class ExerciseMetricList extends Component {
    render() {
        return (
            <List>
                <Subheader>Metrics</Subheader>
                {this.props.metrics ? this.props.metrics.map((m, index) =>                     
                    <ListItem key={m.name}>
                        <ListItemIcon><ActionAssessment color={black}/></ListItemIcon>
                        <ListItemText primary={m.name} secondary={m.uom || ''}/>
                        <ListItemSecondaryAction>
                            <IconMenu iconButtonElement={
                                    <IconButton touch={true} tooltipPosition="bottom-left">
                                        <MoreVertIcon color={grey[400]} />
                                    </IconButton>
                                }>
                                    <MenuItem leftIcon={<ArrowUpward/>} onClick={() => this.props.onMoveUpClick(index)}>Move Up</MenuItem>
                                    <MenuItem leftIcon={<ArrowDownward/>} onClick={() => this.props.onMoveDownClick(index)}>Move Down</MenuItem>
                                    <Divider />
                                    <MenuItem leftIcon={<ContentCreate/>} onClick={() => this.props.onEditClick(m)}>Edit</MenuItem>
                                    <MenuItem leftIcon={<ActionDelete/>} onClick={() => this.props.onDeleteClick(m)}>Delete</MenuItem>
                            </IconMenu>
                        </ListItemSecondaryAction>
                    </ListItem>
                ) : ''}
            </List>
        );
    }
}

export default ExerciseMetricList;
