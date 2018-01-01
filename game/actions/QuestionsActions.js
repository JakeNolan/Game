import axios from 'axios';
import { AllHtmlEntities } from 'html-entities';
import {
    FETCH_QUESTIONS,
    ANSWERED_QUESTION,
    CLEAR_ANSWERED_QUESTIONS
} from './types';

const QUESTIONS_URL = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';

export const fetchQuestions = (callback) => async (dispatch) => {
    try {
        const entities = new AllHtmlEntities();
        const { data } = await axios.get(QUESTIONS_URL);
        const totalResults = data.results.length;

        const formattedQuestions = data.results.map((result, r) => {
            const q = entities.decode(result.question.toString());

            const questionOrder = (r) ? `${r + 1} of ${totalResults}` : ` 1 of ${totalResults}`;

            return { ...result, question: q, questionOrder };
        });

        dispatch({ type: FETCH_QUESTIONS, payload: formattedQuestions });
        callback();
    } catch (error) {
        console.log('*** Fetch questions error: ', error);
    }
};


export const answerQuestion = (question, response) => {
    try {
        const responded_correctly = (response === question.correct_answer);

        const answeredQuestion = { ...question, responded_correctly };

        return { type: ANSWERED_QUESTION, payload: answeredQuestion };
    } catch (error) {
        console.log('*** Answer questions error: ', error);
    }
};

export const clearAnsweredQuestions = (callback) => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_ANSWERED_QUESTIONS });
        callback();
    } catch (error) {
        console.log('*** Clear questions error: ', error);
    }
};