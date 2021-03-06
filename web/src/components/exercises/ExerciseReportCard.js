import React, { Component } from 'react';

import { ActionAssessment, ActionWatchLater, ActionSpeakerNotes } from 'material-ui/svg-icons';
import { black } from '@material-ui/core/colors';
import { Avatar, Card, CardHeader, CardContent, List } from '@material-ui/core';
import LeftRightListItem from '../shared/LeftRightListItem';
import ToggledLeftRightListItem from '../shared/ToggledLeftRightListItem';

import { CARD_WIDTH, EXERCISE_TYPES, EXERCISE_AVATAR_COLOR } from '../../constants';
import { getElapsedTime } from '../../util';

const styles = {
    avatar: {
        backgroundColor: EXERCISE_AVATAR_COLOR,
        width: 32,
        height: 32,
    },
    cardHeader: {
        backgroundColor: EXERCISE_AVATAR_COLOR,
        marginBottom: 0,
    },
    cardTitle: {
        fontSize: '20px',
        marginTop: 6,
    },
    card: {
        width: CARD_WIDTH - 35,
        height: '100%',
        position: 'relative',
        marginBottom: 20,
        marginLeft: 5,
        marginTop: 5,
    },
    link: {
        cursor: 'pointer',
    },
    notes: {
        marginLeft: 20,
    },
};

class ExerciseReportCard extends Component {
    getMetricDisplayName = (metric) => {
        return metric.name + (metric.uom ? ' (' + metric.uom + ')' : '');
    }

    render() {
        let exerciseImage = this.props.exercise.type;
        if (EXERCISE_TYPES.indexOf(exerciseImage) === -1) { 
            exerciseImage = 'unknown';
        }

        return (
            <div>
                <Card style={styles.card}>
                    <CardHeader                        
                        style={styles.cardHeader}
                        title={
                            <span 
                                style={{...styles.cardTitle, ...styles.link}}
                                onClick={() => window.open(this.props.exercise.url)}
                            >
                                {this.props.exercise.name}
                            </span>
                        }
                        avatar={
                            <Avatar 
                                src={process.env.PUBLIC_URL + '/img/' + exerciseImage.toLowerCase() + '.png'} 
                                style={styles.avatar}
                            />
                        }
                    >
                    </CardHeader>
                    <CardContent style={styles.text}>
                        <List>
                            {!this.props.exercise.metrics ? '' :
                                this.props.exercise.metrics.map((m, index) =>    
                                    <LeftRightListItem
                                        key={index}
                                        leftIcon={<ActionAssessment color={ black }/>} 
                                        leftText={this.getMetricDisplayName(m)}
                                        rightText={m.value ? m.value : '-'}
                                    />
                                )
                            }
                            <LeftRightListItem
                                leftIcon={<ActionWatchLater color={ black }/>} 
                                leftText={'Duration'}
                                rightText={this.props.exercise.startTime ? getElapsedTime(this.props.exercise.startTime, this.props.exercise.endTime) : ' '} 
                            />
                            {!this.props.exercise.notes ? '' :
                                <ToggledLeftRightListItem
                                    leftIcon={<ActionSpeakerNotes color={black}/>}
                                    leftText={'Notes'}
                                    defaultToggleOpen={false}
                                >
                                    <p>{this.props.exercise.notes}</p>
                                </ToggledLeftRightListItem>
                            }
                        </List>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default ExerciseReportCard;