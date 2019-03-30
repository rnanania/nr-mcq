import React, { Component } from "react";
import "./Results.css";

import axios from "../../shared/axios";

class Results extends Component {
  state = {
    qCollection: []
  };

  componentDidMount() {
    axios.get("/questions.json").then(res => {
      if (res && res.data) {
        const questions = res.data;
        this.setState({ qCollection: questions });
      }
    });
  }

  render() {
    const questions = this.state.qCollection.map((q, qID) => {
      return (
        <div className="Results-Item" key={"Results-" + qID}>
          <p className="Results-Question">{q.question}</p>
          {q.answers.map((ans, aID) => {
            return (
              <label key={qID + "-" + aID}>
                {" "}
                {ans.text} - {ans.vote}
              </label>
            );
          })}
        </div>
      );
    });

    return <div className="Results">{questions}</div>;
  }
}

export default Results;
