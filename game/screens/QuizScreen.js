import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import { answerQuestion } from '../actions';
import { Swipe, CardSection, Btn } from '../components/common';

class QuizScreen extends Component {
    static navigationOptions = {
        title: 'Quiz',
    };

    renderCard(questionItem) {
        const { questionContainerStyle, textStyle, cardContainerStyle, questionOrderStyle } = styles;
        const { category, question, questionOrder } = questionItem;
        return (
            <Card containerStyle={cardContainerStyle} title={category}>
                <View style={questionContainerStyle} >
                    <Text style={textStyle}>{question}</Text>
                </View>
                <View style={questionOrderStyle}>
                    <Text style={textStyle}>{questionOrder}</Text>
                </View>
            </Card>
        );
    }

    renderNoMoreCards = () => {
        const { cardContainerStyle } = styles;
        return (
            <Card containerStyle={cardContainerStyle} title="No more questions">
                <CardSection style={{ backgroundColor: 'transparent' }}>
                    <Btn
                        title="SEE RESULTS!"
                        onPress={() => this.props.navigation.navigate('review')}
                        iconName="trending-up"
                        buttonColor="orangered"
                    />
                </CardSection>
            </Card>
        );
    }

    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <Swipe
                    data={this.props.questions}
                    renderCard={this.renderCard} // no parens so we don't call it immediatley
                    renderNoMoreCards={this.renderNoMoreCards}
                    keyProp="question"
                    onSwipeRight={question => this.props.answerQuestion(question, 'True')}
                    onSwipeLeft={question => this.props.answerQuestion(question, 'False')}
                />
            </View>
        );
    }
}

const styles = {
    questionContainerStyle: {
        borderWidth: 1,
        borderColor: 'orangered',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        marginBottom: 20
    },
    cardContainerStyle: {
        borderRadius: 5,
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        maxWidth: 200,
    },
    questionOrderStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
};

const mapStateToProps = (state) => {
    const { questions } = state;
    return { questions };
};

export default connect(mapStateToProps, { answerQuestion })(QuizScreen);