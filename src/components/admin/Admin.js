import React, { Component } from "react";
import "./Admin.css";

import Question from "../../shared/question/Question";
import axios from "../../shared/axios";

class Admin extends Component {
  state = {
    qCollection: []
  };

  submitQuestions = event => {
    event.preventDefault();
    const questions = this.state.qCollection.map(q => {
      return {
        question: q.question,
        answers: q.answers.map(ans => {
          return {
            text: ans,
            vote: 0
          };
        })
      };
    });

    axios.put("/questions.json", questions).then(res => {
      this.props.history.push("/poll");
    });
  };

  addQuestion = event => {
    const questions = [...this.state.qCollection];
    questions.push({
      question: "",
      answers: ["", ""]
    });
    this.setState({ qCollection: questions });
  };

  removeQuestion = qID => {
    const questions = [...this.state.qCollection];
    questions.splice(qID, 1);
    this.setState({ qCollection: questions });
  };

  addChoice = qID => {
    const questions = [...this.state.qCollection];
    const answers = [...questions[qID].answers];
    answers.push("");
    questions[qID].answers = answers;
    this.setState({ qCollection: questions });
  };

  removeChoice = qID => {
    const questions = [...this.state.qCollection];
    const answers = [...questions[qID].answers];
    answers.splice(-1, 1);
    questions[qID].answers = answers;
    this.setState({ qCollection: questions });
  };

  questionChange = (qID, event) => {
    const questions = [...this.state.qCollection];
    questions[qID].question = event.target.value;
    this.setState({ qCollection: questions });
  };

  answerChange = (qID, aID, event) => {
    const questions = [...this.state.qCollection];
    questions[qID].answers[aID] = event.target.value;
    this.setState({ qCollection: questions });
  };

  componentDidMount() {
    axios.get("/questions.json").then(res => {
      if (res && res.data) {
        const questions = res.data.map(q => {
          return {
            question: q.question,
            answers: q.answers.map(ans => ans.text)
          };
        });
        this.setState({ qCollection: questions });
      }
    });
  }

  render() {
    const idToken = localStorage.getItem("idToken");
    const expirationTime = localStorage.getItem("expirationTime");
    if (
      !idToken ||
      !expirationTime ||
      Number(expirationTime) < new Date().getTime()
    ) {
      this.props.history.push("/login");
    }

    const questions = this.state.qCollection.map((q, index) => {
      return (
        <Question
          key={index}
          qid={index}
          question={q.question}
          answers={q.answers}
          questionChange={this.questionChange.bind(this, index)}
          answerChange={aID => this.answerChange.bind(this, index, aID)}
          removeQuestion={this.removeQuestion.bind(this, index)}
          addChoice={this.addChoice.bind(this, index)}
          removeChoice={this.removeChoice.bind(this, index)}
        />
      );
    });

    return (
      <div className="Admin">
        <button className="btn" onClick={this.addQuestion}>
          Add Question
        </button>
        {questions}
        <button className="btn" type="submit" onClick={this.submitQuestions}>
          Upload Questions
        </button>
      </div>
    );
  }
}

export default Admin;
