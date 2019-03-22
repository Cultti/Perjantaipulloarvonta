import React, { Component } from 'react';
import { Icon } from 'antd';

class Slide extends Component {
    render() {

        var healths = [];

        for(var i = 0; i < this.props.health; i++) {
            let classes = "health-icon";
            if (this.props.health - i <= this.props.deaths) {
                classes = "die health-icon"
            }

            console.log(this.props.health - i + " " + this.props.deaths);

            healths.push(<Icon key={i} type="heart" theme="filled" className={classes}/>)
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