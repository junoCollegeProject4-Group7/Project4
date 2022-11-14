import React from "react";


//api is https://opentdb.com/api_config.php

//example api https://opentdb.com/api.php?amount=10&category=25&difficulty=medium&type=multiple
const QuestionCard = ({ question, userName, resetTimer }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);


  const questions = question.map(function (q) {
    return q.question;
  });

    setCurrentQuestion(currentQuestion + 1);
    if (e.target.textContent === correctAns[currentQuestion]) {
      setScore(score + 1);
    } else {
      setScore(score);
    }


};
export default QuestionCard;