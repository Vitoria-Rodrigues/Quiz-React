import { createContext, useReducer } from "react";

import questions from "../data/questions_complete";

const STAGES = ["Start", "Playing", "End"];

const initialState = {
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0,
    score: 0,
}

const quizReducer = (state, action) => {

    switch(action.type){
        case "CHANGE_STATE":
            return {
                ...state,
                gameStage: STAGES[1],
            }

        case "REORDER_QUESTIONS":
            const reorderQuestion = state.questions.sort(() => {
                return Math.random() - 0.5;
            });

            return {
                ...state,
                questions: reorderQuestion,
            };
        
        case "CHANGE_QUESTION":
            const nextQuestion = state.currentQuestion + 1;
            let endGame = false;

            if(!state.questions[nextQuestion]){
                endGame = true;
            }

            return{
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? STAGES[2] : state.gameStage,
            }
        
        case "NEW_GAME":
            return initialState;
    }
}

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const value = useReducer(quizReducer, initialState);

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};