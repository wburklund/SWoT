import React, { Component } from 'react';

import { Card, CardHeader, CardContent } from '@material-ui/core';
import Avatar from 'material-ui/Avatar';
import { black, grey } from '@material-ui/core/colors';
import Divider from 'material-ui/Divider';

import Spinner from '../Spinner';

const styles = {
    cardHeader: {
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
    content: {
        position: 'relative',
    },
};

class HistoryCard extends Component {
    render() {
        return (
            this.props.isEmpty && this.props.hideIfEmpty ? '' :
                <Card style={!this.props.refreshing ? styles.card : { ...styles.card, backgroundColor: grey[300] } }>
                    <CardHeader
                        title={<span style={styles.cardTitle}>this.props.title</span>}
                        style={{ ...styles.cardHeader, backgroundColor: this.props.color}}
                        avatar={<Avatar backgroundColor={this.props.color} color={black} size={36} icon={this.props.icon}></Avatar>}
                    />
                    <CardContent>
                        <div style={styles.content}>
                            {this.props.header}
                            {this.props.header ? <Divider style={styles.headerDivider}/> : ''}
                            {!this.props.isEmpty ? this.props.children : this.props.emptyContent}
                            {this.props.refreshing ? <Spinner/> : ''}
                            {this.props.footer ? <Divider style={styles.footerDivider}/> : ''}
                            {this.props.footer}
                        </div>
                    </CardContent>
                </Card> 
        );
    }
}

export default HistoryCard;