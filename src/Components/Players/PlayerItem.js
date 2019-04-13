import React, { Component } from 'react';
import { Icon } from 'antd';

class PlayerItem extends Component {
    render() {
        let healths = [];

        for (let i = 0; i < this.props.health; i++) {
            let classes = 'health-icon';
            if (this.props.health - i <= this.props.deaths) {
                classes = 'die health-icon';
            }
            healths.push(<Icon key={this.props.targetKey + i} type="heart" theme="filled" className={classes} />)
        }

        let nameClass = '';
        if (this.props.health === this.props.deaths) {
            nameClass = 'stroke';
        }

        return (
            <div className="player-item">
                <span className={nameClass}>{this.props.name}</span>
                <span className="health-container">{healths}</span>
            </div>
        );
    }
}

export default PlayerItem;