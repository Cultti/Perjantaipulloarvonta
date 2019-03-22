import React, { Component } from 'react';
import { Icon } from 'antd';

class Slide extends Component {
    render() {

        let healths = [];

        for(let i = 0; i < this.props.health; i++) {
            healths.push(<Icon key={i} type="heart" theme="filled" />)
        }

        return (
            <div>
                <h3>{this.props.name}</h3>
                <div className="health-bar">
                    {healths}
                </div>
            </div>
        )
    }
}

export default Slide;