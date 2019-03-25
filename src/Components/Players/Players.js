import React, { Component } from 'react';
import { List } from 'antd';
import PlayerItem from './PlayerItem';
import './Players.scss';

class Players extends Component {
    render() {
        let allPlayers = [];
        if (this.props.players !== undefined && this.props.deadPlayers !== undefined) {
            let players;
            if (this.props.deadPlayers.length > 0) {
                players = this.props.players.filter(player => !this.props.deadPlayers.some(dead => dead.key === player.key));
            } else {
                players = this.props.players;
            }
            allPlayers = players
                .concat(this.props.deadPlayers)
                .sort((a, b) => a.name === b.name ? 0 : a.name < b.name ? -1 : 1);
        }

        return (
            <List
                header={<div>Players</div>}
                bordered
                dataSource={allPlayers.reverse()}
                rowKey={player => player.key}
                renderItem={player => <List.Item><PlayerItem {...player} /></List.Item>}
            />
        );
    }
}

export default Players;