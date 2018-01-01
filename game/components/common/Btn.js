import React from 'react';
import { Button } from 'react-native-elements';
// use touchables to wrap what we want to be a Button!
const Btn = ({ onPress, title, iconName, buttonColor }) => {
    const { buttonStyle, textStyle, } = styles;
    return (
        <Button
            containerViewStyle={[buttonStyle, { borderColor: buttonColor }]}
            textStyle={[textStyle, { color: buttonColor }]}
            onPress={onPress}
            title={title}
            icon={{ name: iconName, color: buttonColor }}
            backgroundColor='#fff'
            color='#007aff'
            borderRadius={5}
        />


    );
};

const styles = {
    buttonStyle: {
        flex: 1, //expand to fill as muuch content as possible
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        margin: 10
    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',

    }
};

export { Btn };