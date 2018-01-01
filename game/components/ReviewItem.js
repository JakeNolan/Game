import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const ReviewItem = ({ question, answeredCorrectly, correctAnswer, label }) => {
    const { containerStyle, iconStyle, textContainerStyle, textStyle, labelStyle, correctAnswerStyle, answerContainerStyle } = styles;
    const icon = (answeredCorrectly) ? (<Icon containerStyle={iconStyle} name='done' color='green' />) : (<Icon containerStyle={iconStyle} name='clear' color='red' />);
    return (
        <View style={containerStyle}>
            {icon}
            <View style={textContainerStyle}>
                <Text style={textStyle}>{question}</Text>
                <View style={answerContainerStyle}>
                    <Text style={[textStyle, labelStyle]}>{label}</Text>
                    <Text style={[textStyle, correctAnswerStyle]}>{correctAnswer}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textContainerStyle: {
        flex: 1,
        flexDirection: 'column'

    },
    textStyle: {
        fontSize: 14,
        marginBottom: 10,
    },
    labelStyle: {
        fontStyle: 'italic',
        marginRight: 10,

    },
    correctAnswerStyle: {
        fontStyle: 'italic'
    },
    answerContainerStyle: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#ddd',
        paddingTop: 10
    },
    iconStyle: {
        marginRight: 10
    }
};

export default ReviewItem;