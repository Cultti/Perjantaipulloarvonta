import React, { Component } from 'react';
import './App.scss';
import { Carousel, Header, Log, Settings, Players } from './Components';
import { Button, Row, Col } from 'antd';
import * as uuid from 'uuid';

class App extends Component {
    players = [
        { name: 'Pelaaja 1', health: 1, deaths: 0, key: uuid.v1() },
        { name: 'Pelaaja 2', health: 1, deaths: 0, key: uuid.v1() },
        { name: 'Pelaaja 3', health: 1, deaths: 0, key: uuid.v1() },
    ];

    constructor(props) {
        super(props);

        this.carousel = React.createRef();
        this.carouselInterval = 0;

        var players = this.getPlayers();

        this.state = this.getDefaultState();
    }

    getDefaultState = () => ({
        running: false,
        settingsVisible: false,
        currentSlide: 0,
        players: this.getPlayers(),
        deadPlayers: [],
        log: [],
    });

    getPlayers = () => window.localStorage['players'] ? JSON.parse(window.localStorage['players']) : this.players;

    reset = () => {
        this.setState(this.getDefaultState());
    }

    start = () => {
        if (this.state.players.length === 1) {
            return;
        }

        var length = this.getRandom() % this.state.players.length * 300 * 2 + 5000;

        this.carouselInterval = setInterval(() => {
            this.carousel.nextSlide();
        }, 300);

        this.setState({
            running: true,
        });

        setTimeout(this.kill, length);
    }

    getRandom = () => {
        var output = new Uint32Array(1);
        window.crypto.getRandomValues(output);
        return output[0];
    }

    stop = () => {
        clearInterval(this.carouselInterval);
    }

    kill = () => {
        this.stop();

        setTimeout(() => {
            let index = this.state.currentSlide;
            let players = this.state.players;
            let player = players[index];

            player.deaths++;

            let log = this.state.log;
            log.push({ log: player.name + " lost a life. Lives: " + player.health + ", deaths: " + player.deaths, key: uuid.v1() });
            let deadPlayers = this.state.deadPlayers;
            if (player.health === player.deaths) {
                deadPlayers.push(player);
            }

            this.setState({
                players,
                log,
                deadPlayers,
            });

            setTimeout(() => {
                this.carousel.nextSlide();
                setTimeout(() => {
                    let cleanPlayers = this.cleanPlayers();
                    if (cleanPlayers.length > 1) {
                        this.start();
                    } else {
                        let log = this.state.log;
                        log.push({ log: cleanPlayers[0].name + " won!", key: uuid.v1() });
                        this.setState({
                            players: cleanPlayers,
                            log,
                        });
                    }
                }, 1000);
            }, 2000);

        }, 1000);
    }

    cleanPlayers = () => this.state.players.filter(player => player.health !== player.deaths);

    savePlayers = () => window.localStorage['players'] = JSON.stringify(this.state.players);

    openSettings = () => {
        this.setState({
            settingsVisible: true,
        });
    }

    closeSettings = () => {
        this.setState({
            settingsVisible: false,
        });
        this.savePlayers();
    }

    handleSlideChange = (newSlide) => {
        this.setState({
            currentSlide: newSlide
        });

        if (newSlide === 0) {
            this.setState({
                players: this.cleanPlayers(),
            });
        }
    }

    handleAddNewPlayer = () => {
        let players = this.state.players;
        players.push({ name: '', health: 1, deaths: 0, key: uuid.v1() });
        this.setState({
            players,
        });
    }

    handleDeletePlayer = (index) => {
        let players = this.state.players;
        players.splice(index, 1);
        this.setState({
            players,
        });
    }

    handlePlayerNameChange = (index, name) => {
        let players = this.state.players;
        players[index].name = name;
        this.setState({
            players,
        });
    }

    handlePlayerHealthChange = (index, value) => {
        let players = this.state.players;
        players[index].health = players[index].health + value;
        this.setState({
            players,
        });
    }

    render() {
        let log = JSON.parse(JSON.stringify(this.state.log));
        return (
            <div className="App">
                <Header
                    settingsClick={this.openSettings}
                />
                <Carousel
                    ref={node => (this.carousel = node)}
                    players={this.state.players}
                    slideChange={this.handleSlideChange}
                />
                <Settings
                    visible={this.state.settingsVisible}
                    onOk={this.closeSettings}
                    onCancel={this.closeSettings}
                    players={this.state.players}
                    playerNameChange={this.handlePlayerNameChange}
                    playerHealthChange={this.handlePlayerHealthChange}
                    addNewPlayer={this.handleAddNewPlayer}
                    deletePlayer={this.handleDeletePlayer}
                />
                <div className="button-group">
                    <Button className="button" onClick={this.start} disabled={this.state.running} size="large" type="primary">
                        Start
                    </Button>
                    <Button className="button" onClick={this.reset} disabled={this.state.running && this.state.players.length !== 1} size="large" type="danger">
                        Reset
                    </Button>
                </div>
                <div className="bottom-info">
                    <Row gutter={10}>
                        <Col span={12}>
                            <Log log={log} />
                        </Col>
                        <Col span={12}>
                            <Players
                                players={this.state.players}
                                deadPlayers={this.state.deadPlayers} />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default App;
