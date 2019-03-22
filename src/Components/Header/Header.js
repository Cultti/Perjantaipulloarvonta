import React, { Component } from 'react';
import { Button } from 'antd';
import './Header.scss';

class Header extends Component {
    render() {
        return (
            <div id="header">
                <span className="right">
                    <Button 
                        shape="circle"
                        icon="tool"
                        size="large" 
                        onClick={this.props.settingsClick}/>
                </span>
            </div>
        )
    }
}
export default Header;