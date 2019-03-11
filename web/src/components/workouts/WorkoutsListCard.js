import React, { Component } from 'react';
import moment from 'moment';

import { Avatar, Card, CardHeader, CardContent, List } from '@material-ui/core';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import { grey, red } from '@material-ui/core/colors';
import Divider from 'material-ui/Divider';

import { WORKOUT_AVATAR_COLOR } from '../../constants';
import { ListItem } from 'material-ui/List';
import Spinner from '../shared/Spinner';
import { fontContrastColor } from '../../util';

const styles = {
    avatar: {
        backgroundColor: WORKOUT_AVATAR_COLOR,
        width: 36,
        height: 36,
    },
    cardHeader: {
        backgroundColor: WORKOUT_AVATAR_COLOR,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    card: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    headerDivider: {
        marginTop: 10,
    },
    footerDivider: {
        marginBottom: 10,
    },
};

class WorkoutsListCard extends Component {
    sort = (a, b) => {
        let f = this.props.timeField;
        if (this.props.sort.toLowerCase() === 'desc') {
            return a[f] > b[f] ? -1 : 
                a[f] === b[f] ? 0 : 1; 
        }
        else {
            return a[f] < b[f] ? -1 : 
                a[f] === b[f] ? 0 : 1; 
        }        
    }

    render() {
        return (
            (!this.props.workouts || this.props.workouts.length === 0) && this.props.hideIfEmpty ? '' :
                <Card 
                    style={!this.props.refreshing ? styles.card : 
                        { 
                            ...styles.card, 
                            backgroundColor: grey[300], 
                        }
                    }
                >
                    <CardHeader
                        title={<span style={styles.cardTitle}>{this.props.title}</span>}
                        style={styles.cardHeader}
                        avatar={
                            <Avatar style={{ ...styles.avatar, backgroundColor: WORKOUT_AVATAR_COLOR }}>
                                {this.props.icon}
                            </Avatar>
                        }
                    />
                    <CardContent>
                        {this.props.options}
                        {this.props.options ? <Divider style={styles.headerDivider}/> : ''}
                        <List>
                            {this.props.workouts && this.props.workouts.length > 0 ? this.props.workouts
                                .sort(this.sort)
                                .map((w, index) => {
                                    let color = !w.routine.color || w.routine.color === 0 ? red[500] : w.routine.color;
                                    return (
                                        <ListItem
                                            key={index}
                                            primaryText={w.routine.name}
                                            secondaryText={this.props.timePrefix + ' ' + moment(w[this.props.timeField]).calendar()}
                                            leftAvatar={
                                                <Avatar style={{ backgroundColor: color }}>
                                                    <ActionAssignmentTurnedIn color={fontContrastColor(color)}/>
                                                </Avatar>
                                            }
                                            rightIcon={this.props.itemRightIcon}
                                            onClick={() => this.props.onClick(w.id)}
                                            disabled={this.props.refreshing}
                                        />
                                    );
                                }) : this.props.emptyContent
                            }
                        </List>
                        {this.props.children ? <Divider style={styles.footerDivider}/> : ''}
                        {this.props.children}
                        {this.props.refreshing ? <Spinner/> : ''}
                    </CardContent>
                </Card> 
        );
    }
}

export default WorkoutsListCard;