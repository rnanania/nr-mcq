import React, { Component } from "react";
import "./Poll.css";

import axios from "../../shared/axios";

class Poll extends Component {
  state = {
    qCollection: []
  };

  submitPoll = event => {
    event.preventDefault();
    axios.get("/questions.json").then(res => {
      if (res && res.data) {
        const questionsWithVote = res.data;
        this.state.qCollection.forEach((q, index) => {
          // Check if polling for same question
          if (q.question === questionsWithVote[index].question) {
            // Find the answer to poll
            const checkedAns = q.answers.find(ans => ans.checked);
            const ansId = questionsWithVote[index].answers.findIndex(
              ans => ans.text === checkedAns.text
            );
            if (ansId !== -1) {
              questionsWithVote[index].answers[ansId].vote += 1;
            }
          }
        });

        // Save updated vote to Database.
        axios.put("/questions.json", questionsWithVote).then(res => {
          this.state.qCollection.forEach(q => {
            const answer = q.answers.find(ans => ans.checked);
            localStorage.setItem(q.question, answer.text);
          });
          this.props.history.push("/results");
        });
      }
    });
  };

  pollUpdate = (qID, aID) => {
    const questions = [...this.state.qCollection];
    const checked = !questions[qID].answers[aID].checked;
    questions[qID].answers.forEach(ans => {
      ans.checked = false;
    });
    questions[qID].answers[aID].checked = checked;
    this.setState({ qCollection: questions });
  };

  componentDidMount() {
    axios.get("/questions.json").then(res => {
      if (res && res.data) {
        const questions = res.data.map(q => {
          return {
            question: q.question,
            answers: q.answers.map((ans, index) => {
              const fromLocalStorage = localStorage.getItem(q.question);
              return {
                text: ans.text,
                checked: ans.text === fromLocalStorage ? true : false
              };
            })
          };
        });

        // Mark first option checked if nothing found from localstorage.
        questions.forEach(q => {
          const checkedFound = q.answers.findIndex(ans => ans.checked);
          if (checkedFound === -1) {
            q.answers[0].checked = true;
          }
        });

        this.setState({ qCollection: questions });
      }
    });
  }

  render() {
    const questions = this.state.qCollection.map((q, qID) => {
      return (
        <div className="Poll-Item" key={"Poll-" + qID}>
          <p className="Poll-Question">{q.question}</p>
          {q.answers.map((ans, aID) => {
            return (
              <div key={qID + "-" + aID}>
                <label className="Poll-Choice">
                  <input
                    className="Poll-Choice-Input"
                    type="radio"
                    value="ans.text"
                    checked={ans.checked}
                    onChange={this.pollUpdate.bind(this, qID, aID)}
                  />
                  {ans.text}
                </label>
              </div>
            );
          })}
        </div>
      );
    });

    return (
      <div className="Poll">
        {questions}
        <button className="btn" onClick={this.submitPoll}>
          Submit Poll
        </button>
      </div>
    );
  }
}

export default Poll;
