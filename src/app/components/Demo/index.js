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
        loop: false,
    }

    toggleLoop() {
        const { loop } = this.state;
        this.setState({ loop: !loop });
    }

    render() {
        const { loop } = this.state;

        return (
            <>
                <div className='demo'>
                    <Carousel
                        loop={loop}
                        startIndex={0}
                        speed={.5}
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
                            SLIDE - 4
                            <p>
                                You can't SUCKA!!
                            </p>
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
                    <label>
                        <input type='checkbox' checked={loop} onChange={() => this.toggleLoop()} /> Loop
                    </label>
                    <button type='button' onClick={() => this.carousel.next()}>
                        next &rarr;
                    </button>
                </div>
            </>
        );
    }
}
