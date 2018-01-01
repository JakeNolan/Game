import React, { Component } from 'react';
import {
    View,
    Animated, //much more complex animation
    PanResponder,
    Dimensions,
    LayoutAnimation, //used for broad general stroke animation
    UIManager,
    Platform
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250; //milliseconds

class Swipe extends Component {

    //if I don't pass in an onSwipeRight then react will use the below to avoid errors
    static defaultProps = {
        onSwipeRight: () => { },
        onSwipeLeft: () => { },
        keyProp: 'id'
    }

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();

        //always set up instance in our constructor
        const panResponder = PanResponder.create({
            // anytime user taps screen
            // ret true this panRes handles the gest if false we don't want it responsible for gest
            onStartShouldSetPanResponder: () => true,

            // user drags finger around screen
            onPanResponderMove: (event, gesture) => {
                //tying panResponder to Animated component!!!
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            // user lets go
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });

        // there is no relation to state being related to panResponder, it is its own self contained object
        //this.panResponder = panResponder;  - could use this but the docs use state so we are going to also
        // same above goes for position
        this.state = { panResponder, position, index: 0 };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) { // asks if this is the exact same array in memory
            this.setState({ index: 0 });
        }
    }
    componentWillUpdate() {
        //some weird thing for android only ??
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        LayoutAnimation.spring();
    }

    onSwipeComplete(direction) {
        const { onSwipeRight, onSwipeLeft, data } = this.props;
        const item = data[this.state.index];
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

        //set our position to the top corner so we don't swipe 2 cards at once
        this.state.position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1 });
    }

    getCardStyle() {
        const { position } = this.state;
        // interpolation, tying x coord with rotation

        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            //this spread operator takes all the props form getLayout and adds it with the transform to have only one obj
            ...position.getLayout(),
            transform: [{ rotate }]
        };
    }
    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION //milliseconds
        }).start(() => this.onSwipeComplete(direction));
    }


    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }


    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }

        const deck = this.props.data.map((item, i) => {

            if (i < this.state.index) { return null; }
            if (i === this.state.index) {
                // ... syntax passes all the callbacks from panHandlers to the whole view
                return (
                    <Animated.View
                        key={item[this.props.keyProp]}
                        style={[this.getCardStyle(), styles.cardStyle]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            return (
                <Animated.View
                    key={item[this.props.keyProp]}
                    style={[styles.cardStyle, { top: 10 * (i - this.state.index), zIndex: -i }]} //cascade the cards down
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        });

        return Platform.OS === 'android' ? deck : deck.reverse();
    }
    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH,
    },
};

export { Swipe };