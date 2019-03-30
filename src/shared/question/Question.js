import React from "react";
import "./Question.css";

const Question = props => {
  const answers = props.answers.map((ans, index) => {
    return (
      <input
        className="Question-choice"
        key={index}
        type="text"
        placeholder="Possible answer"
        value={ans}
        onChange={props.answerChange(index)}
        required
      />
    );
  });

  return (
    <div className="Question">
      <textarea
        className="Question-text"
        type="text"
        placeholder="Question"
        value={props.question}
        onChange={props.questionChange}
        required
      />
      {answers}
      <button className="Btn Question-add-choice" onClick={props.addChoice}>
        Add Choice
      </button>
      <button
        className="Btn Question-remove-choice"
        onClick={props.removeChoice}
        disabled={props.answers.length <= 2}
      >
        Remove Choice
      </button>
      <button className="Btn Question-remove" onClick={props.removeQuestion}>
        Remove Question
      </button>
    </div>
  );
};

export default Question;
