import React, { Component } from 'react';
import './App.scss';
import { Carousel, Header, Log, Settings, Players } from './Components';
import { Button, Row, Col } from 'antd';
import * as uuid from 'uuid';
import ReactAI from 'react-appinsights';
import GHCorner from 'react-gh-corner';

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

        this.state = this.getDefaultState();
    }

    getDefaultState = () => ({
        running: false,
        settingsVisible: false,
        currentSlide: 0,
        players: this.getPlayers(),
        alivePlayers: this.getPlayers(),
        log: [],
    });

    getPlayers = () => {
        let players;
        if (window.localStorage['players']) {
            players = JSON.parse(window.localStorage['players']);
        } else {
            players = this.players;
        }

        return players.map(player => {
            return {
                ...player,
                deaths: 0,
            };
        });
    }

    getEmptyPlayer = (name) => {
        return {
            name,
            health: 1,
            deaths: 0,
            key: uuid.v1(),
        }
    }

    getAlivePlayers = () => this.state.players.filter(player => player.health > player.deaths);

    reset = () => {
        this.setState(this.getDefaultState());
    }

    start = () => {
        if (this.getAlivePlayers().length === 1) {
            return;
        }

        let length = this.getRandom() % this.state.players.length * 300 * 2 + 5000;

        this.carouselInterval = setInterval(() => {
            if (this.getRandom() % 100 > 5) {
            this.carousel.nextSlide();
            }
        }, 300);

        this.setState({
            running: true,
        });

        setTimeout(this.kill, length);
    }

    getRandom = () => {
        let output = new Uint32Array(1);
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
            let player = this.state.players[index];

            player.deaths++;

            let log = this.state.log;
            log.push({ log: player.name + " lost a life. Lives: " + player.health + ", deaths: " + player.deaths, key: uuid.v1() });

            this.setState({
                log,
            });

            setTimeout(() => {
                let alivePlayers = this.getAlivePlayers();
                if (alivePlayers.length > 1) {
                    this.start();
                } else {
                    this.carousel.nextSlide();
                    setTimeout(() => {
                        let log = this.state.log;
                        log.push({ log: alivePlayers[0].name + " won!", key: uuid.v1() });
                        this.setState({
                            log,
                            running: false,
                        });
                        ReactAI.ai().flush();
                    }, 1000)
                }
            }, 2000);

        }, 1000);
    }

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
                alivePlayers: this.getAlivePlayers(),
            });
        }
    }

    handleAddNewPlayer = () => {
        let players = this.state.players;
        players.push({ name: '', health: 1, deaths: 0, key: uuid.v1() });
        this.setState({
            players,
        });
        this.savePlayers();
    }

    handleDeletePlayer = (index) => {
        let players = this.state.players;
        players.splice(index, 1);
        this.setState({
            players,
        });
        this.savePlayers();
    }

    handlePlayerNameChange = (index, name) => {
        let players = this.state.players;
        players[index].name = name;
        this.setState({
            players,
        });
        this.savePlayers();
    }

    handlePlayerHealthChange = (index, value) => {
        let players = this.state.players;
        players[index].health = players[index].health + value;
        this.setState({
            players,
        });
        this.savePlayers();
    }

    render() {
        let log = JSON.parse(JSON.stringify(this.state.log));
        return (
            <div className="App">
                <GHCorner 
                    href="https://github.com/Cultti/Perjantaipulloarvonta"
                    position="top-left"
                    size={50}
                    ariaLabel="Fork me on github!"
                    bgColor="#000000"
                    openInNewTab={true}
                />
                <Header
                    settingsClick={this.openSettings}
                />
                <Carousel
                    ref={node => (this.carousel = node)}
                    players={this.state.alivePlayers}
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
                    <Button className="button" onClick={this.reset} disabled={this.state.running} size="large" type="danger">
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
                                />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default ReactAI.withTracking(App);
