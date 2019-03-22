import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'antd';
import './NameInput.scss';

class NameInput extends Component {
    isBeforeDisabled = () => {
        return this.props.health < 1;
    }

    before = (
        <Button
            size="small"
            icon="minus"
            onClick={this.props.decreaseHealth}
            name={this.props.targetKey}
            disabled={this.isBeforeDisabled()}
        />
    );

    after = (
        <Button
            size="small"
            icon="plus"
            onClick={this.props.increaseHealth}
            name={this.props.targetKey}
        />
    )

    render() {
        return (
            <Row gutter={5} className="name-input">
                <Col span={15}>
                    <Input
                        defaultValue={this.props.name}
                        onChange={this.props.onChange}
                        name={this.props.targetKey}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        value={this.props.health}
                        addonBefore={this.before}
                        addonAfter={this.after}
                        name={this.props.targetKey}
                    />
                </Col>
                <Col span={1}>
                    <Button
                        name={this.props.targetKey}
                        key="delete"
                        icon="delete"
                        type="danger"
                        onClick={this.props.delete}
                    />
                </Col>
            </Row>
        )
    }
}

export default NameInput;