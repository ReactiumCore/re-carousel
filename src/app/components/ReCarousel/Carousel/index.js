import op from 'object-path';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TimelineMax, TweenMax, Power2 } from 'gsap/umd/TweenMax';

/**
 * -----------------------------------------------------------------------------
 * React Component: Carousel
 * -----------------------------------------------------------------------------
 */
export default class Carousel extends Component {
    static propTypes = {
        active: PropTypes.number,
        defaultStyle: PropTypes.object,
        loop: PropTypes.bool,
        next: PropTypes.number,
        onChange: PropTypes.func,
        onComplete: PropTypes.func,
        onNext: PropTypes.func,
        onPrev: PropTypes.func,
        previous: PropTypes.number,
        speed: PropTypes.number,
        startIndex: PropTypes.number,
        style: PropTypes.object,
    };

    static defaultProps = {
        active: 0,
        defaultStyle: {
            display: 'flex',
            flexWrap: 'no-wrap',
        },
        loop: false,
        next: null,
        onChange: null,
        onComplete: null,
        onNext: null,
        previous: null,
        speed: 0.25,
        startIndex: 0,
        style: {},
    };

    constructor(props) {
        super(props);

        const { active, next, previous, startIndex, style } = props;

        this.slides = {};

        this.state = {
            active: startIndex || active,
            next,
            previous,
            style,
        };

        this.animating = false;
        this.index = startIndex || active;
        this.onChange = this.onChange.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }

    next(next) {
        if (this.animating === true) {
            return;
        }

        const { loop, speed } = this.props;
        const max = Object.keys(this.slides).length - 1;
        const { active = 0 } = this.state;

        next = next || active + 1;
        next = loop === true && next > max ? 0 : next;

        if (next > max && !loop) {
            return;
        }

        const currentSlide = op.get(
            this.slides,
            `slide-${active}.slide.current`,
        );
        const nextSlide = op.get(this.slides, `slide-${next}.slide.current`);

        this.animating = true;
        TweenMax.set(currentSlide, { display: '' });
        TweenMax.set(nextSlide, { display: '' });

        const evt = { active, next, currentSlide, nextSlide };

        this.onNext(evt);

        const params = {
            onComplete: () => {
                this.onComplete(evt);
            },
        };

        const tl = new TimelineMax(params);
        if (next === 0) {
            tl.fromTo(
                currentSlide,
                speed,
                { xPercent: -100 },
                { xPercent: -200, ease: Power2.easeInOut },
                0,
            );
            tl.fromTo(
                nextSlide,
                speed,
                { xPercent: 100 },
                { xPercent: 0, ease: Power2.easeInOut },
                0,
            );
        } else {
            tl.fromTo(
                currentSlide,
                speed,
                { xPercent: 0 },
                { xPercent: -100, ease: Power2.easeInOut },
                0,
            );
            tl.fromTo(
                nextSlide,
                speed,
                { xPercent: 0 },
                { xPercent: -100, ease: Power2.easeInOut },
                0,
            );
        }
    }

    prev(next) {
        if (this.animating === true) {
            return;
        }

        const { loop, speed } = this.props;
        const max = Object.keys(this.slides).length - 1;
        const { active = 0 } = this.state;

        next = next || active - 1;
        next = loop === true && next < 0 ? max : next;

        if (next < 0) {
            return;
        }

        this.animating = true;

        const currentSlide = op.get(
            this.slides,
            `slide-${active}.slide.current`,
        );
        const nextSlide = op.get(this.slides, `slide-${next}.slide.current`);

        TweenMax.set(currentSlide, { display: '', xPercent: -100 });
        TweenMax.set(nextSlide, { display: '' });

        const evt = { active, next, currentSlide, nextSlide };

        this.onPrev(evt);

        const params = {
            onComplete: () => {
                this.onComplete(evt);
            },
        };

        const tl = new TimelineMax(params);
        if (next === max) {
            tl.fromTo(
                currentSlide,
                speed,
                { xPercent: 0 },
                { xPercent: 100, ease: Power2.easeInOut },
                0,
            );
            tl.fromTo(
                nextSlide,
                speed,
                { xPercent: -200 },
                { xPercent: -100, ease: Power2.easeInOut },
                0,
            );
        } else {
            tl.fromTo(
                currentSlide,
                speed,
                { xPercent: -100 },
                { xPercent: 0, ease: Power2.easeInOut },
                0,
            );
            tl.fromTo(
                nextSlide,
                speed,
                { xPercent: -100 },
                { xPercent: 0, ease: Power2.easeInOut },
                0,
            );
        }
    }

    jumpTo(index) {
        const { active } = this.state;

        if (index === active) {
            return;
        }

        if (index < active) {
            this.prev(index);
        }

        if (index >= active) {
            this.next(index);
        }
    }

    onChange(evt) {
        const { active, next, currentSlide, nextSlide } = evt;
        const { onChange } = this.props;

        this.index = next;

        if (typeof onChange === 'function') {
            onChange({
                previous: active,
                active: next,
                previousSlide: currentSlide,
                currentSlide: nextSlide,
            });
        }
    }

    onComplete(evt) {
        const { active, next, currentSlide, nextSlide } = evt;
        const { onComplete } = this.props;

        TweenMax.set(nextSlide, { xPercent: 0, display: '' });

        this.animating = false;

        if (typeof onComplete === 'function') {
            onComplete({
                previous: active,
                active: next,
                previousSlide: currentSlide,
                currentSlide: nextSlide,
            });
        }

        this.setState({ active: next, next: null });

        setTimeout(() => {
            this.onChange(evt);
        }, 100);
    }

    onNext(evt) {
        const { onNext } = this.props;
        if (typeof onNext === 'function') {
            onNext(evt);
        }
    }

    onPrev(evt) {
        const { onPrev } = this.props;
        if (typeof onPrev === 'function') {
            onPrev(evt);
        }
    }

    render() {
        let { active, next, style } = this.state;
        const { children, defaultStyle } = this.props;

        style = {
            ...defaultStyle,
            ...style,
        };

        return (
            <div className='carousel' style={style}>
                {React.Children.map(children, (child, index) =>
                    React.cloneElement(child, {
                        active,
                        index,
                        next,
                        onComplete: this.onComplete,
                        ref: slide => {
                            this.slides[`slide-${index}`] = slide;
                        },
                    }),
                )}
            </div>
        );
    }
}
