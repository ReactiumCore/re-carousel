import React, { Component } from 'react';
import cn from 'classnames';
import op from 'object-path';

/**
 * -----------------------------------------------------------------------------
 * React Component: Slide
 * -----------------------------------------------------------------------------
 */
export default class Slide extends Component {
    static defaultProps = {
        defaultStyle: {
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
        } = this.props;

        const cname = cn({
            slide: true,
            [`slide-${index}`]: true,
            [className]: !!className,
        });

        const display = active === index || next === index;

        const newStyle = {
            ...defaultStyle,
            ...style,
            display: display ? '' : 'none',
        };

        return (
            <div className={cname} style={newStyle} ref={this.slide}>
                {children}
            </div>
        );
    }
}
