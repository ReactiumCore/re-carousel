import React, { Component } from 'react';
import cn from 'classnames';

/**
 * -----------------------------------------------------------------------------
 * React Component: Slide
 * -----------------------------------------------------------------------------
 */
export default class Slide extends Component {
    static defaultProps = {
        defaultStyle: {
            display: 'none',
            width: '100%',
            height: '100%',
            flexShrink: 0,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            style: props.style || {},
        };

        this.slide = React.createRef();
    }

    componentDidMount() {
        const element = this.slide.current;
        this.setState({ element });
    }

    render() {
        let { style } = this.state;

        const {
            active,
            children,
            className,
            index,
            defaultStyle,
            next,
            onComplete
        } = this.props;

        const cname = cn({
            slide: true,
            [`slide-${index}`]: true,
            [className]: !!className,
        });

        const display = active === index || next === index;

        style = {
            ...defaultStyle,
            ...style,
            display: display ? 'block' : 'none',
        };

        return (
            <div className={cname} style={style} ref={this.slide}>
                {children}
            </div>
        );
    }
}
