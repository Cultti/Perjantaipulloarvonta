import React, { Component } from 'react';
import { Icon } from 'antd';

class Slide extends Component {
    render() {

        let healths = [];

        for(let i = 0; i < this.props.health; i++) {
            let classes = 'health-icon';
            if (this.props.health - i <= this.props.deaths) {
                classes = 'die health-icon';
            }
            healths.push(<Icon key={this.props.targetKey+i} type="heart" theme="filled" className={classes}/>)
        }

        return (
            <div className={this.props.className}>
                <h3>{this.props.name}</h3>
                <div className="health-bar">
                    {healths}
                </div>
            </div>
        )
    }
}

export default Slide;