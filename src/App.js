import React, { Component } from 'react';
import './App.css';
import { Carousel, Header, Settings } from './Components';
import { Button } from 'antd/lib/radio';
import * as uuid from 'uuid';

class App extends Component {
    constructor(props) {
        super(props);

        this.carousel = React.createRef();
        this.carouselInterval = 0;

        this.state = {
            running: false,
            settingsVisible: false,
            currentSlide: 0,
            names: [
                { name: 'Pelaaja 1', health: 1, deaths: 0, key: uuid.v1() },
                { name: 'Pelaaja 2', health: 1, deaths: 0, key: uuid.v1() },
                { name: 'Pelaaja 3', health: 1, deaths: 0, key: uuid.v1() },
            ],
        }
    }

    start = () => {
        if (this.state.names.length === 1) {
            return;
        }

        var length = this.state.names.length * 5 * 300 * Math.random() + this.state.names.length * 2 * 300;

        this.carouselInterval = setInterval(() => {
            this.carousel.nextSlide();
        });

        this.setState({
            running: true,
        });

        setTimeout(this.kill, length);
    }

    stop = () => {
        clearInterval(this.carouselInterval);
    }

    kill = () => {
        this.stop();

        setTimeout(() => {
            let index = this.state.currentSlide;
            let names = this.state.names;
            var selected = names[index];

            selected.deaths++;

            this.setState({
                names,
            });

            setTimeout(() => {
                this.carousel.nextSlide();
                setTimeout(() => {
                    let cleanNames = this.cleanNames();
                    if (cleanNames.length > 1) {
                        this.start();
                    } else {
                        this.setState({
                            names: this.cleanNames(),
                        });
                    }
                }, 1000);
            }, 2000);

        }, 1000);
    }

    cleanNames = () => this.state.names.filter(name => name.health !== name.deaths);

    openSettings = () => {
        this.setState({
            settingsVisible: true,
        });
    }

    closeSettings = () => {
        this.setState({
            settingsVisible: false,
        });
    }

    handleSlideChange = (newSlide) => {
        this.setState({
            currentSlide: newSlide
        });

        if (newSlide === 0) {
            this.setState({
                names: this.cleanNames(),
            });
        }
    }

    handleAddNewName = () => {
        let names = this.state.names;
        names.push({ name: '', health: 1, deaths: 0, key: uuid.v1() });
        this.setState({
            names,
        });
    }

    handleDeleteName = (index) => {
        let names = this.state.names;
        names.splice(index, 1);
        this.setState({
            names,
        });
    }

    handleNameChange = (index, name) => {
        var names = this.state.names;
        names[index].name = name;
        this.setState({
            names,
        });
    }

    handleHealthChange = (index, value) => {
        var names = this.state.names;
        names[index].health = names[index].health + value;
        this.setState({
            names,
        });
    }

    render() {
        return (
            <div className="App">
                <Header
                    settingsClick={this.openSettings}
                />
                <Carousel
                    ref={node => (this.carousel = node)}
                    names={this.state.names}
                    slideChange={this.handleSlideChange}
                />
                <Settings
                    visible={this.state.settingsVisible}
                    onOk={this.closeSettings}
                    onCancel={this.closeSettings}
                    names={this.state.names}
                    nameChange={this.handleNameChange}
                    healthChange={this.handleHealthChange}
                    addNewName={this.handleAddNewName}
                    deleteName={this.handleDeleteName}
                />

                <Button onClick={this.start} disabled={this.state.running}>
                    Start
                </Button>
            </div>
        );
    }
}

export default App;
