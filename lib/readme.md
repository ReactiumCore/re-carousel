After spending hours trying to find a React carousel that fit my extremely basic needs:

1. Supply a component or markup to the carousel.
2. Autosize the size of the slide to the parent container.
3. Control the carousel with any button or component.
4. No style sheets to force my way into to customize the carousel.
5. Loop.
6. Set initial slide index.
7. Disable tabbing to next slide. This is the most important as I was using a form in each slide and didn't want the carousel to jump to the next slide until the current slide was validated.

I decided to roll yet another carousel because my basic needs couldn't be met by the masses.


## Installation

```
npm i --save reactium-carousel
```

## Usage

```
import React from 'react';
import { Carousel, Slide } from 'reactium-carousel';

// Your component
export default class Demo extends React.Component {

    constructor(props) {
        super(props);

        // Create a reference to the carousel
        // so we can control it with buttons
        this.carousel = null;
    }

    render() {
        return (
            <div>
                <div style={{width: 500, height: 500}}>
                    <Carousel speed={0.25} loop={true} startIndex={0} ref={elm => (this.carousel = elm)}>
                        <Slide>SLIDE - 1</Slide>
                        <Slide>SLIDE - 2</Slide>
                        <Slide>SLIDE - 3</Slide>
                    </Carousel>
                </div>
                <div>
                    <button type='button' onClick={() => this.carousel.prev()}>
                        back
                    </button>
                    <button type='button' onClick={() => this.carousel.next()}>
                        next
                    </button>
                    <button type='button' onClick={() => this.carousel.jumpTo(2)}>
                        Slide - 3
                    </button>
                </div>
            </div>
        )
    }
}
```


## Properties

###### animating
_Boolean_ : The animation status.

###### index
_Number_ : The active slide index.


## Methods

###### next()
Navigate to the next slide. If loop is `true`, navigate to the first slide.

###### prev()
Navigate to the prev slide. If loop is `true`, navigate to the last slide.

###### jumpTo(index:Number)
Navigate to the specified slide index.


## Events

###### onNext / onPrev
Triggered before the next/previous animation.

###### onComplete
Triggered after the animation has completed.

###### onChange
Triggered after the animation has completed and state update.


## Roadmap

These requirements weren't apart of my initial release because I didn't need them at the time.

1. Autoplay.
2. Swipe next/prev.
