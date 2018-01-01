import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import { Btn, CardSection, Header } from '../components/common';
import ReviewItem from '../components/ReviewItem';
import { clearAnsweredQuestions } from '../actions';

class ReviewScreen extends Component {
    static navigationOptions = () => ({
        title: 'Results',
    });

    constructor(props) {
        super(props);

        this.state = {
            total: 0
        };
    }

    componentDidMount() {
        this.getTotal(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.getTotal(nextProps);
    }

    getTotal({ answers }) {
        answers.map(result => {
            if (result.responded_correctly) {
                this.setState({ total: ++this.state.total });
            }
        });
    }

    playAgain = () => {
        this.props.clearAnsweredQuestions(() => {
            console.log('trying to navigate');
            this.props.navigation.navigate('home');
        });
    }


    renderQuizResults() {
        return this.props.answers.map(answer => {
            const { question, responded_correctly, correct_answer } = answer;
            return (
                <Card containerStyle={{ borderRadius: 5 }} key={question}>
                    <ReviewItem
                        question={question}
                        answeredCorrectly={responded_correctly}
                        correctAnswer={correct_answer}
                        label="Correct answer:"
                    />
                </Card>
            );
        }).reverse();
    }


    render() {
        const ans = `You scored ${this.state.total} / 10`;

        return (
            <ScrollView>
                <Header style={{ maxWidth: 120 }} headerText={ans} />
                {this.renderQuizResults()}
                <CardSection>
                    <Btn
                        title="PLAY AGAIN?"
                        onPress={this.playAgain}
                        iconName="mood"
                        buttonColor="orangered"
                    />
                </CardSection>
            </ScrollView>
        );
    }
}


const mapStateToProps = (state) => {
    const { answers } = state;
    return { answers };
};
export default connect(mapStateToProps, { clearAnsweredQuestions })(ReviewScreen);