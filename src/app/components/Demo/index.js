import React, { Component } from 'react';
import { Carousel, Slide } from 'reactium-carousel';
// import { Carousel, Slide } from 'components/ReCarousel';

/**
 * -----------------------------------------------------------------------------
 * React Component: Demo
 * -----------------------------------------------------------------------------
 */
export default class Demo extends Component {
    carousel = null;

    state = {
        autoplay: true,
        duration: 5,
        loop: true,
        speed: 0.25,
        startIndex: 0,
        swipeable: true,
    };

    toggleAutoPlay() {
        const { autoplay } = this.state;
        this.setState({ autoplay: !autoplay });
    }

    toggleLoop() {
        const { loop } = this.state;
        this.setState({ loop: !loop });
    }

    toggleSwipeable() {
        const { swipeable } = this.state;
        this.setState({ swipeable: !swipeable });
    }

    render() {
        const {
            autoplay,
            duration,
            loop,
            speed,
            startIndex,
            swipeable,
        } = this.state;

        return (
            <>
                <div className='btn-group'>
                    <label>
                        <input
                            type='checkbox'
                            checked={autoplay}
                            onChange={() => this.toggleAutoPlay()}
                        />{' '}
                        Autoplay
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            checked={loop}
                            onChange={() => this.toggleLoop()}
                        />{' '}
                        Loop
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            checked={swipeable}
                            onChange={() => this.toggleSwipeable()}
                        />{' '}
                        Swipeable
                    </label>
                </div>
                <div className='demo'>
                    <Carousel
                        autoplay={autoplay}
                        duration={duration}
                        loop={loop}
                        startIndex={startIndex}
                        speed={speed}
                        swipeable={swipeable}
                        ref={elm => (this.carousel = elm)}>
                        <Slide>SLIDE - 0</Slide>
                        <Slide>SLIDE - 1</Slide>
                        <Slide>SLIDE - 2</Slide>
                        <Slide>
                            SLIDE - 3
                            <p>
                                Try tabbing to the next slide which has an input
                                in it..
                            </p>
                            <input type='text' placeholder='Do something...' />
                        </Slide>
                        <Slide>
                            SLIDE - 4<p>You can't SUCKA!!</p>
                            <input type='text' placeholder='Say something...' />
                        </Slide>
                        <Slide>SLIDE - 5</Slide>
                    </Carousel>
                </div>
                <div className='btn-group'>
                    <button type='button' onClick={() => this.carousel.prev()}>
                        &larr; prev
                    </button>
                    <button
                        type='button'
                        onClick={() => this.carousel.jumpTo(3)}>
                        Slide - 3
                    </button>
                    <button type='button' onClick={() => this.carousel.next()}>
                        next &rarr;
                    </button>
                </div>
            </>
        );
    }
}
