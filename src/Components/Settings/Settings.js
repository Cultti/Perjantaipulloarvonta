import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import NameInput from './NameInput';

class Settings extends Component {
    handleInputChange = (event) => {
        var value = event.target.value;
        var index = event.target.name

        this.props.handleNameChange(index, value);
    }

    handleDecreaseHealth = (event) => {
        this.props.handleHealthChange(event.target.name, -1);
    }

    handleIncreaseHealth = (event) => {
        this.props.handleHealthChange(event.target.name, 1);
    }

    handleDelete = (event) => {
        this.props.handleDeleteName(event.target.name);
    }

    render() {
        return (
            <Modal
                title="Settings"
                visible={this.props.visible}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="add" icon="plus-circle" onClick={this.props.handleAddNewName}/>,
                    <Button key="close" onClick={this.props.onOk}>Close</Button>
                ]}>

                {this.props.names.map((name, i) => {
                    return (
                        <NameInput
                            targetKey={i}
                            onChange={this.handleInputChange}
                            decreaseHealth={this.handleDecreaseHealth}
                            increaseHealth={this.handleIncreaseHealth}
                            delete={this.handleDelete}
                            {...name}
                        />
                    );
                })}
            </Modal>
        );
    }
}

export default Settings