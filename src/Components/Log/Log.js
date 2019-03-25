import React, { Component } from 'react';
import { List } from 'antd';

class Log extends Component {
    render() {
        return (
            <List
                header={<div>Log</div>}
                bordered
                dataSource={this.props.log.reverse()}
                rowKey={logEntry => logEntry.key}
                renderItem={logEntry => <List.Item>{logEntry.log}</List.Item>}
            />
        );
    }
}

export default Log;