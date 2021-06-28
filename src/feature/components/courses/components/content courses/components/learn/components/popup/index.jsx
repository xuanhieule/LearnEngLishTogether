import React from 'react';
import CoursesApi from '../../../../../../../../../api/courses';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            time: 'start',
            title: 'Chào mừng bạn đến với khóa học',
            text: '' ,
            buttonText: 'Bắt đầu' 
        };
        this.popupHandle = this.popupHandle.bind(this);
    }
    
    popupHandle() {
        let { time } = this.state;
        
        if(time === 'start'){
            this.setState({
                time: 'end',
                title: 'Chúc mừng bạn đã hoàn thành',
                buttonText: 'Đồng ý'
            });
            
            this.props.startQuiz();
        } else {
            let reload = () =>{
                window.location.reload()
            }
            let data = {
                courseVocabularyId: this.props.coursesId,
                quizz : this.props.dataIdLearn ,
                highScore : this.props.score
            }
            console.log(data)
             
            const sendata = async () => {
                await CoursesApi.postQuestion(data)
                window.location.reload();
              };
              sendata();      
            // window.location.reload();// restart the application
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            text: 'Chúc mừng bạn đã hoàn thành. <br /> Số điểm: <strong>' + Number(this.props.score+1) 
            // text: 'Chúc mừng bạn đã hoàn thành. <br /> Bạn đã thuộc: <strong>' + this.props.score + '</strong> trong số <strong>' +this.props.total +'</strong> từ vựng.'
        })
    }
    
    createMarkup(text) {
        return {__html: text};
    }
    
    
    render() {
       
        let { title, text, buttonText } = this.state;
        
        let { style } = this.props;
        
        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="popup">
                            <h1>{title}</h1>
                            <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                            <button className="fancy-btn" onClick={this.popupHandle}>{buttonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup
