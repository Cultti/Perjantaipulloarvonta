import React, { Component } from 'react';
import { Carousel } from 'antd';
import './Carousel.scss';
import Slide from './Slide';

class CarouselComponent extends Component {
    constructor(props) {
        super(props);
        this.carousel = React.createRef();
    }

    handleSlideChange = (newIndex) => {
        this.props.slideChange(newIndex);
    }

    nextSlide = () => {
        this.carousel.next();
    }

    render() {
        let classes = this.props.names.length === 1 ? 'slider winner' : 'slider';
        return (
            <Carousel
                className={classes}
                ref={node => (this.carousel = node)}
                dots={false}
                afterChange={this.handleSlideChange}>
                {
                    this.props.names.map((name, i) => {
                        let classes = '';
                        if (name.health === name.deaths) {
                            classes = 'death';
                        }

                        return (<Slide {...name} targetKey={name.key} className={classes} />)
                    })
                }
            </Carousel>
        );
    }
}

export default CarouselComponent;