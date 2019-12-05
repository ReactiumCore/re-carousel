After spending hours trying to find a React carousel that fit my extremely basic needs:

1. No style sheets to force my way into to customize the carousel.
2. Supply a component or markup to the carousel.
3. Autosize the size of the slide to the parent container.
4. Control the carousel with any button or component.
5. Loop.
6. Set initial slide index.
7. Disable tabbing to next slide. This is the most important as I was using a form in each slide and didn't want the carousel to jump to the next slide until the current slide was validated.

I decided to roll yet another carousel because my basic needs couldn't be met by the masses.

> **1.1.0 Update:** Added autoplay and swipe left/right to navigate through slides on mobile. Added autoplay.

## Installation

[![Greenkeeper badge](https://badges.greenkeeper.io/Atomic-Reactor/re-carousel.svg)](https://greenkeeper.io/)

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

## Carousel Props

##### autoplay
_Boolean_ : Autoplay the slides and display for a fixed period of time: `duration`.

_Default_ : false

##### duration
_Number_ : Time in seconds to display a slide when `autoplay` is `true`.

_Default_ : 10

##### loop
_Boolean_ : Loop back to the first slide when at the end of the slides list.

_Default_ : false

##### pauseOnHover
_Boolean_ : Pause `autoplay` on mouse hover.

_Default_ : true

##### speed
_Number_ : Time in seconds of the slide animation.

_Default_ : 0.5

##### startIndex
_Number_ : Zero based integer that sets the initial slide displayed.

_Default_ : 0

##### style
_Object_ : Style object applied to the `Carousel.container` DOM element.

##### swipeable
_Boolean_ : Enable/Disable swipe navigation when in a mobile view.

_Default_ : true


## Carousel Public Properties

##### animating
_Boolean_ : The animation status.

##### container
_DOMElement_ : The Carousel wrapper `<div>` element.

##### index
_Number_ : The active slide index.

##### paused
_Boolean_ : The autoplay status.


## Carousel Methods

##### next()
Navigate to the next slide. If loop is `true`, navigate to the first slide.

##### prev()
Navigate to the prev slide. If loop is `true`, navigate to the last slide.

##### jumpTo(index:Number)
Navigate to the specified slide index.

##### play()
Start the autoplay. This will reset the timer back to zero.

##### pause()
Pause the autoplay and sets the `paused` property to: true.

##### resume()
Resume the autoplay and sets the `paused` property to: false.

##### stop()
Stop the autoplay. This will reset the timer back to zero.


## Carousel Events

##### onComplete
Triggered after the animation has completed.

##### onChange
Triggered after the animation has completed and state update.

##### onNext / onPrev
Triggered before the next/previous animation.

##### onPlay
Triggered when `play()` function is called.

##### onPause
Triggered when the `pause()` function is called.

##### onResume
Triggered when the `resume()` function is called.

##### onStop
Triggered when the `stop()` function is called.


## Roadmap

These features we not apart of my initial release because I didn't need them at the time.

1. ~~Autoplay~~. _Added in 1.1.0_
2. ~~Swipe next/prev~~. _Added in 1.1.0_


## Contributing
The src is built on [Reactium](http://reactium.io).. learn that $#!+

No really PRs are more than welcome...

Clone the source repo from [here](https://github.com/Atomic-Reactor/re-carousel).

Install dependencies and run locally:

```
$ cd /Your/Copy/of/repo
$ npm install && npm run local
```

Navigate to the `~/src/app/components/ReCarousel` directory.

**Profit.**
