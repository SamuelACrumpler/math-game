import React, { Component } from 'react';
import banks from "../files/banks.json"

//the game game
/*
Needs parser
Needs to display word
needs timer
needs score
Score is equal to length of word.
Ideally the game should mark which parts of the words/sentence are wrong.

*/


//selects word bank and displays description also name entry


class game extends Component {
    constructor(props) {
		super(props);

		this.state = {
            name : '',
            desc : '',
            curWord : 'temp',
            input : '',
            wordBank: '',
            bankTitles : ['English', "Spanish", "Danish"],
            title : '',
            score : 0,
            seconds : 60,
            wordCount: 0,
            bank : 0
		}
    
        this.onChange = this.onChange.bind(this);
        this.countDown = this.countDown.bind(this);
    
	
    }

    componentDidMount() {
      
        let str = "";

       


       
      


    }

    loadBank(val){
        this.setState({wordBank : val}, () => 
           { 
            this.timer = setInterval(this.countDown, 1000)
            this.getRandomWord(); 

           }
        ) 
    }
    
    getRandomWord(){
       let rand = Math.floor(Math.random() * this.state.wordBank.length)
       this.setState({curWord : this.state.wordBank[rand]})

    }

    countDown() {
        let s = this.state.seconds - 1;
        this.setState({seconds : s})
        
        if (this.state.seconds === 0) { 
          clearInterval(this.timer);
          localStorage.setItem("score", this.state.score);
          localStorage.setItem("words", this.state.wordCount);

            this.props.history.push("/scores")

        }
      }


    onChange(event) {
		const state = this.state
		state[event.target.name] = event.target.value;
        this.setState(state);


        if(this.state.input === this.state.curWord){
            this.setState({score : this.state.score + this.state.curWord.length});
            this.setState({wordCount : this.state.wordCount+1})
            this.getRandomWord();
            this.setState({ input : '' });

        }
        
    }

render() {
        return (
            <div className="container p-2 rounded bg-light">
                <div className="row">
                    <div className="col-4">
                        <h3>Score: {this.state.score} Word Count: {this.state.wordCount}</h3>
                    </div>
                    <div className="col-6 text-center">
                        <h3>Operations : +-/* {this.state.title}</h3>
                    </div>
                    <div className="col-2">
                        <h3 className="text-right">Time: {this.state.seconds}</h3>
                    </div>
				</div>
                <div className="text-center mb-4">
                    <h3>230 +-/* 3333333</h3>
                </div>
                <div>
                    <input type="text" name="input" value={this.state.input} onChange={this.onChange} className="form-control" autocomplete="off" autoFocus/>
                </div>
            </div>

        );
    }
}

export default game;
