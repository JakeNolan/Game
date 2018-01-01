import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
import { Header, CardSection, Btn } from '../components/common';

class HomeScreen extends Component {

    static navigationOptions = () => ({
        title: 'Trivia Buff',
    });

    onButtonPress = () => {
        console.log('btn press');
        this.props.fetchQuestions(() => {
            this.props.navigation.navigate('quiz');
        });
    }

    render() {
        const { textStyle, containerStyle } = styles;
        const title = 'Welcome to the Trivia Challenge!';
        const summary = 'You will be presented with 10 True or False questions.';
        const directions = 'Swipe left for false and right for true.';
        const callToAct = 'Can you score 100%?';
        return (
            <View style={containerStyle}>
                <Header style={{ maxWidth: 170 }} headerText={title} />

                <CardSection>
                    <Text style={textStyle}>{summary}</Text>
                </CardSection>

                <CardSection>
                    <Text style={textStyle}>{directions}</Text>
                </CardSection>

                <CardSection>
                    <Text style={textStyle}>{callToAct}</Text>
                </CardSection>

                <CardSection style={{ backgroundColor: 'transparent' }}>
                    <Btn
                        title="BEGIN"
                        onPress={this.onButtonPress}
                        iconName="play-arrow"
                        buttonColor="orangered"
                    />
                </CardSection>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    textStyle: {
        fontSize: 20,
        maxWidth: 200,
        margin: 30,
        textAlign: 'center'
    }
};
export default connect(null, { fetchQuestions })(HomeScreen);