import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import { Button } from '@material-ui/core/';
import { grey } from '@material-ui/core/colors';

import ExerciseHistoryDialogContent from './ExerciseHistoryDialogContent';
import { fetchExercisesHistory, clearExercisesHistory } from './ExercisesHistoryActions';
import Spinner from '../../shared/Spinner';
import { showSnackbar } from '../../app/AppActions';

const styles = {
    dialogContent: {
        width: 400,
    },
};

const initialState = {
    api: {
        isExecuting: false,
        isErrored: false,
    },
    filters: {
        offset: 0,
        limit: 10,
        order: 'desc',
        exerciseId: undefined,
    },
};

class ExerciseHistoryDialog extends Component {
    state = initialState

    componentWillReceiveProps = (nextProps) => {
        if (!this.props.open && nextProps.open) {
            this.props.clearExercisesHistory().then(() => {
                this.fetchHistory({ ...this.state.filters, exerciseId: nextProps.exercise.id });
            });
        }
    }

    fetchHistory = (filters) => {
        this.setState({ 
            api: { ...this.state.api, isExecuting: true },
            filters: { ...filters, exerciseId: this.props.exercise.id },
        }, () => {
            this.props.fetchExercisesHistory(filters)
            .then(response => {
                this.setState({ api: { isExecuting: false, isErrored: false }});
            }, error => {
                this.props.showSnackbar('Error fetching Exercise history: ' + error);
                this.setState({ api: { isExecuting: false, isErrored: true }});
            });
        });
    }

    handleCloseClick = () => {
        this.setState({ api: { isExecuting: false, isErrored: false }});
        this.props.onClose();
    }

    handleViewFullHistoryClick = () => {
        this.navigate('/exercises/history/' + this.props.exercise.id);
    }

    navigate = (url) => {
        this.props.history.push(url);
    }

    render() {
        let refreshStyle = this.state.api.isExecuting ? { backgroundColor: grey[300] } : {};

        return (
            <div>
                <Dialog
                    bodyStyle={refreshStyle}
                    actionsContainerStyle={refreshStyle}
                    titleStyle={refreshStyle}
                    contentStyle={{ ...styles.dialogContent, refreshStyle }}
                    title={this.props.exercise.name + ' History'} 
                    autoScrollBodyContent={true}
                    actions={
                        <div>
                            <Button 
                                onClick={this.handleViewFullHistoryClick} 
                                disabled={this.state.api.isExecuting}
                            >
                                View Full History
                            </Button>
                            <Button 
                                onClick={this.handleCloseClick} 
                                disabled={this.state.api.isExecuting}
                            >
                                Close
                            </Button>
                        </div>
                    }
                    modal={true}
                    open={this.props.open}
                >
                    {!this.props.exercisesHistory ? '' : 
                        <ExerciseHistoryDialogContent
                            exercise={this.props.exercise}
                            history={this.props.exercisesHistory}
                            filters={this.state.filters}
                            refreshing={this.state.api.isExecuting}
                        />
                    }
                    {this.state.api.isExecuting ? <Spinner/> : ''}
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    exercisesHistory: state.exercisesHistory,
});

const mapDispatchToProps = {
    fetchExercisesHistory,
    clearExercisesHistory,
    showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ExerciseHistoryDialog));