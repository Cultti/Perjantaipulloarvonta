import React, { Component } from 'react';
import { Carousel } from 'antd';
import './Carousel.scss';
import Slide from './Slide';

class CarouselComponent extends Component {
    constructor(props) {
        super(props);
        this.carousel = React.createRef();
    }

    handleSlideChange = (oldIndex, newIndex) => {
        this.props.slideChange(newIndex);
    }

    nextSlide = () => {
        this.carousel.next();
    }

    render() {
        return (
            <Carousel
                ref={node => (this.carousel = node)}
                dots={false}
                beforeChange={this.handleSlideChange}>
                {
                    this.props.names.map((name, i) => {
                        return (<Slide {...name} />)
                    })
                }
            </Carousel>
        );
    }
}

export default CarouselComponent;