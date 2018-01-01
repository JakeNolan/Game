import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import { ANSWERED_QUESTION, CLEAR_ANSWERED_QUESTIONS } from '../actions/types';

export default function (state = [], action) {
    switch (action.type) {
        // payload here will be all things from AsyncStorage we are pulling just our answers off of that
        // could use this in an enhancement in the app to pick up where we left off if the user closes the app
        case REHYDRATE:
            return action.payload.answers || []; 
        case ANSWERED_QUESTION:
            const answeredQuestions = _.uniqBy([action.payload, ...state], 'question');
            return answeredQuestions;
        case CLEAR_ANSWERED_QUESTIONS:
            return [];
        default:
            return state;
    }
};