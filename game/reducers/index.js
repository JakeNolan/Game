import { combineReducers } from 'redux';
import QuestionsReducer from './QuestionsReducer';
import AnswersReducer from './AnswersReducer';

export default combineReducers({
    questions: QuestionsReducer,
    answers: AnswersReducer,
});