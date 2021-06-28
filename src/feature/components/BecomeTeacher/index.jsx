import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router-dom";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "650px",
    backgroundColor: "white",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  imgpre: {
    height: "300px",
    width: "300px",
    margin: "20px 20px",
  },
}));

function getSteps() {
  return ["ques 1", "ques 2", "ques 3", "upload"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return [
        "Bạn đã từng dạy kiểu gì?",
        "Trợ giảng",
        "Trực tuyến",
        "Dạy chuyên nghiệp tại các trường lớp",
        "Chưa từng dạy",
      ];
    case 1:
      return [
        "Bạn đã dạy trực tuyến chưa?",
        "Tôi mới bắt đầu",
        "Tôi đã từng",
        "Tôi có nhiều kinh nghiệm",
      ];
    case 2:
      return ["Bạn đã có nhóm của mình chưa?", "Tôi chưa có", "Tôi đã có"];
    case 3:
      return ["Bạn đã có nhóm của mình chưa?", "Tôi chưa có", "Tôi đã có"];
    default:
      return "Unknown stepIndex";
  }
}

export default function BecomeTeacher() {
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [file, setFile] = React.useState({ file: "", imagePreviewUrl: "" });
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  console.log(getStepContent(activeStep));

  let { imagePreviewUrl } = file;
  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = <img className={classes.imgpre} src={imagePreviewUrl} />;
  } else {
    $imagePreview = <div className="previewText"></div>;
  }
  const backto = () =>{
    history.push("/home");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
  };
  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };
  return (
    <div className={classes.root}>
      <h2>Chia sẻ về bạn</h2>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, key) => (
          <Step key={key + 1}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
                Bạn đã hoàn thành, chúng tôi sẽ xem xét và thông báo lại với bạn sau.
            </Typography>
            <Button variant="contained" color="primary" onClick={backto}>Đồng ý</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}></Typography>
            {activeStep === steps.length - 1 ? (
              <div className="previewComponent">
                <p>
                  Hãy gửi cho chúng tôi 1 tấm ảnh chứng chỉ của bạn, để chúng
                  tôi xác thực bạn có trình độ tiếng anh
                </p>
                <form onSubmit={(e) => this._handleSubmit(e)}>
                <div class="upload-btn-wrapper">
                  <button class="btn">Tải ảnh lên</button>
                  <input
                    type="file"
                    className="fileInput"
                    type="file"
                    accept="image/*"
                    capture="camera"
                    onChange={(e) => handleImageChange(e)}
                    name="myfile"
                  />
                  </div>
                </form>
                
                <div className="imgPreview">{$imagePreview}</div>
              </div>
            ) : (
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  {getStepContent(activeStep)[0]}
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={value}
                  onChange={handleChange}
                >
                  <br />
                  {getStepContent(activeStep).map((val, idx) =>
                    idx == 0 ? (
                      console.log(getStepContent(activeStep)[idx])
                    ) : (
                      <FormControlLabel
                        value={getStepContent(activeStep)[idx]}
                        control={<Radio />}
                        label={getStepContent(activeStep)[idx]}
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>
            )}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Quay lại
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Hoàn thành" : "Tiếp tục"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
