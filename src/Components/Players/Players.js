import React, { Component } from 'react';
import { List } from 'antd';
import PlayerItem from './PlayerItem';
import './Players.scss';

class Players extends Component {
    render() {
        let alive = this.props.players.filter(player => player.health > player.deaths);
        return (
            <List
                header={<div>Players - Alive {alive.length}/{this.props.players.length}</div>}
                bordered
                dataSource={this.props.players}
                rowKey={player => player.key}
                renderItem={player => <List.Item><PlayerItem targetKey={player.key} {...player} /></List.Item>}
            />
        );
    }
}

export default Players;