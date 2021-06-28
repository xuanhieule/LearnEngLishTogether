import React from "react";
import Answers from "../Answers";

import Popup from "../popup";

var data = [];
var dataIdDuplicate = [];
var dataIdLearn = [];

function unique(arr) {
  return Array.from(new Set(arr));
}
console.log("xxxxxxxxx", unique(data));

class MainQuiz extends React.Component {
  constructor(props) {
    let dataProps = props.data.data;
    dataIdDuplicate = props.questionDuplicate;
    let setScore = props.setScore;
    let action = props.action;
    function pushArr(data, dataIdLearn, objtemp) {
      data.push(objtemp);
      dataIdLearn.push(objtemp.id);
    }
    let index = 0;
    if (action == "Learn") {
      console.log("Họcccccccccccccccccccccccccccccc");
      unique(dataProps).map((ques) => {
        if (index < 10 && dataIdDuplicate.includes(ques._id) == false) {
          index++;
          let correctTemp = 0;
          ques.correct == "A"
            ? (correctTemp = 1)
            : ques.correct == "B"
            ? (correctTemp = 2)
            : ques.correct == "C"
            ? (correctTemp = 3)
            : (correctTemp = 4);
          let objtemp = {
            id: ques._id,
            question: ques.question,
            answers: [
              ques.A,
              ques.B,
              ques.C,
              ques.D,
              ques.question,
              ques.Picture,
              ques.fileListen,
            ],
            correct: correctTemp,
          };
          let temp = 0;
          for (var i = 0; i < data.length; i++) {
            if (ques._id == data[i].id) {
              temp++;
            }
          }
          console.log(objtemp);
          temp == 0
            ? // dataIdDuplicate.includes(objtemp.id)==false? pushArr(data,dataIdLearn,objtemp) : console.log(objtemp.id)
              pushArr(data, dataIdLearn, objtemp)
            : (temp = 0);

          unique(data);
        }
      });
    } else {
      // unique(dataProps).map((ques) => {
      //   if(index < 10 && dataIdDuplicate.includes(ques._id)==true ){
      //     index ++;
      //     let correctTemp = 0;
      //     ques.correct == "A"
      //       ? (correctTemp = 1)
      //       : ques.correct == "B"
      //       ? (correctTemp = 2)
      //       : ques.correct == "C"
      //       ? (correctTemp = 3)
      //       : (correctTemp = 4);
      //     let objtemp = {
      //       id: ques._id,
      //       question: ques.question,
      //       answers: [ques.A, ques.B, ques.C, ques.D, ques.question, ques.Picture, ques.fileListen],
      //       correct: correctTemp,
      //     };
      //     pushArr(data,[],objtemp)
      //   }
      // }
      // );
      // data = data.slice(0, 10)
      for (var i = 0; i < dataProps.length; i++) {
        for (var j = 0; j < dataIdDuplicate.length; j++) {
          const random = Math.floor(Math.random() * dataIdDuplicate.length);
          if (index < 10 && dataIdDuplicate.includes(dataProps[random]._id) == true) {
            index++;
            let correctTemp = 0;
            dataProps[random].correct == "A"
              ? (correctTemp = 1)
              : dataProps[random].correct == "B"
              ? (correctTemp = 2)
              : dataProps[random].correct == "C"
              ? (correctTemp = 3)
              : (correctTemp = 4);
            let objtemp = {
              id: dataProps[random]._id,
              question: dataProps[random].question,
              answers: [
                dataProps[random].A,
                dataProps[random].B,
                dataProps[random].C,
                dataProps[random].D,
                dataProps[random].question,
                dataProps[random].Picture,
                dataProps[random].fileListen,
              ],
              correct: correctTemp,
            };
            pushArr(data, [], objtemp);
          }
        }
      }
       data = data.slice(0, 15)
    }

    index = 0;

    console.log("câu hỏi đã học", unique(dataIdDuplicate));
    console.log("câu hỏi sẽ học", unique(data));
    console.log("id sẽ học trong khóa lần này: ", unique(dataIdLearn));
    super(props);
    this.state = {
      nr: 0,
      total: unique(data).length,
      showButton: false,
      questionAnswered: false,
      score: 0,
      displayPopup: "flex",
      setScore: props.setScore,
      wrongg: props.wrongg,
      setWrongg: props.setWrongg,
      coursesId: props.coursesId,
      dataIdLearn: dataIdLearn,
      action: props.action,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleShowButton = this.handleShowButton.bind(this);
    this.handleStartQuiz = this.handleStartQuiz.bind(this);
    this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
  }

  pushData(nr) {
    this.setState({
      question: data[nr].question,
      answers: [
        data[nr].answers[0],
        data[nr].answers[1],
        data[nr].answers[2],
        data[nr].answers[3],
        data[nr].answers[4],
        data[nr].answers[5],
        data[nr].answers[6],
      ],
      correct: data[nr].correct,
      nr: this.state.nr + 1,
    });
  }

  componentWillMount() {
    let { nr } = this.state;
    this.pushData(nr);
  }

  nextQuestion() {
    let { nr, total, score, setScore } = this.state;
    setScore(score + 1);
    if (nr === total) {
      this.setState({
        displayPopup: "flex",
      });
    } else {
      this.pushData(nr);
      this.setState({
        showButton: false,
        questionAnswered: false,
      });
    }
  }

  handleShowButton() {
    this.setState({
      showButton: true,
      questionAnswered: true,
    });
  }

  handleStartQuiz() {
    this.setState({
      displayPopup: "none",
      nr: 1,
    });
  }

  handleIncreaseScore(x) {
    this.setState({
      score: this.state.score + x,
    });
  }

  render() {
    let {
      nr,
      total,
      question,
      answers,
      correct,
      showButton,
      questionAnswered,
      displayPopup,
      score,
      wrongg,
      setWrongg,
      coursesId,
      dataIdLearn,
      action,
    } = this.state;

    return (
      <div className="container">
        {action == "Learn" ? (
          <Popup
            style={{ display: displayPopup }}
            score={score}
            total={total}
            startQuiz={this.handleStartQuiz}
            coursesId={coursesId}
            dataIdLearn={dataIdLearn}
          />
        ) : (
          <Popup
            style={{ display: displayPopup }}
            score={score}
            total={total}
            startQuiz={this.handleStartQuiz}
            coursesId={coursesId}
          />
        )}

        <div className="row">
          <div className="col-lg-10 col-lg-offset-1">
            <div id="question">
              <h4>
                Câu {nr}/{total}
              </h4>
              <p style={{ fontSize: "40px" }}>{question}</p>
            </div>
            <Answers
              answers={answers}
              correct={correct}
              showButton={this.handleShowButton}
              isAnswered={questionAnswered}
              increaseScore={this.handleIncreaseScore}
              increaseScore2={this.handleIncreaseScore2}
              OnClick={this.nextQuestion}
              wrongg={wrongg}
              setWrongg={setWrongg}
            />
            {/* <div id="submit">
              {showButton ? (
                <button className="fancy-btn" onClick={this.nextQuestion}>
                  {nr === total ? "Finish quiz" : "Next question"}
                </button>
              ) : null}
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default MainQuiz;
