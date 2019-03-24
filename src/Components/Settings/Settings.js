import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import NameInput from './NameInput';

class Settings extends Component {
    handleInputChange = (event) => {
        let value = event.target.value;
        let index = event.target.name

        this.props.playerNameChange(index, value);
    }

    handleDecreaseHealth = (event) => {
        this.props.playerHealthChange(event.target.name, -1);
    }

    handleIncreaseHealth = (event) => {
        this.props.playerHealthChange(event.target.name, 1);
    }

    handleDelete = (event) => {
        this.props.deletePlayer(event.target.name);
    }

    render() {
        return (
            <Modal
                title="Settings"
                visible={this.props.visible}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="add" icon="plus-circle" onClick={this.props.addNewPlayer}/>,
                    <Button key="close" onClick={this.props.onOk}>Close</Button>
                ]}>

                {this.props.players.map((player, i) => {
                    return (
                        <NameInput
                            targetKey={i}
                            onChange={this.handleInputChange}
                            decreaseHealth={this.handleDecreaseHealth}
                            increaseHealth={this.handleIncreaseHealth}
                            delete={this.handleDelete}
                            {...player}
                        />
                    );
                })}
            </Modal>
        );
    }
}

export default Settings