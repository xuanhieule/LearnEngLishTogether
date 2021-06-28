import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MainQuiz from "./components/main";
import './style/style.css'
Learn.propTypes = {};

function Learn(props) {
  const [sc, setsc] = useState(0)
  console.log("props.action:    ",props.action)
  return (
    <div>
      <MainQuiz data={props} score={props.score} setScore={props.setScore}  wrongg={props.wrongg} setWrongg={props.setWrongg} sc={sc} setsc={setsc} coursesId={props.coursesId} questionDuplicate={props.questionDuplicate} action={props.action} />
    </div>
  );
}

export default Learn;
