import React, { Component } from 'react';

class game extends Component {
    constructor(props) {
		super(props);

		this.state = {
            name : '',
            ops : [],
            min : '',
            max: '',
            firstR: localStorage.getItem("from"),
            lastR: localStorage.getItem("from"),
            op : '',
            first : '',
            second : '',
            answer: '',
            input : '',
            seconds : 30,
            score : 0
		}
    
        this.onChange = this.onChange.bind(this);
        this.countDown = this.countDown.bind(this);
    
	
    }

    componentDidMount() {
      
        console.log(localStorage.getItem("garr"));
        if(localStorage.getItem("garr") === null || !localStorage.getItem("garr")){this.props.history.push("/"); return;}
        const min = localStorage.getItem("min");
        const max = parseInt(localStorage.getItem("max"));
        const garr = localStorage.getItem("garr").split(',');
        let tops = []
        console.log(garr)
        if(garr[4] === "true"){
            console.log("tabletime")
            this.setState({
                min: min,
                max : max,
                first: min,
                second: min,
                op: "*",
                ops: "Multiplcation Table",
                answer: min*min,
                seconds: 0,
                type: "table"
    
            }, () => {
                console.log("multime")
                this.timer = setInterval(this.countDown, 1000)
            })
            //mul table run
        } else {
            console.log(garr[0])
            if(garr[0] === 'true'){
                tops = tops+"+";
            }
            if(garr[1] === 'true'){
                tops = tops+"-";
            }
            if(garr[2] === 'true'){
                tops = tops+"/";
            }
            if(garr[3] === 'true'){
                tops = tops+"*";
            }
            this.setState({
                min: min,
                max : max+1,
                type: "rand",
                ops: tops,
                seconds: 60
            }, () => {
                this.getRandomProblem()
                this.timer = setInterval(this.countDown, 1000)
            })

            
            //start game
        }

       


       
      


    }

    getNextTableProblem(){
        if(this.state.second+"" === this.state.max+"" && this.state.first+"" === this.state.max+""){//End the game due to the player clearing the last problem with
            //Store important values 
            //Switch to scoreboard
            localStorage.setItem("score", this.state.score);
            localStorage.setItem("seconds", this.state.seconds);
            this.props.history.push("/scores")

        }else if(this.state.second+"" === this.state.max+""){ //If the second value reaches the cap.
            let tfirst = parseInt(this.state.first)+1
         this.setState({
             first: tfirst,
             second: this.state.min,
             answer: tfirst*this.state.min
        })

        }else{//Continue as normal
            let tsecond = parseInt(this.state.second)+1
            this.setState({
                second: tsecond,
                answer: this.state.first*tsecond
            })
        }
        
    }

    getRandomProblem(){
        let tops = this.state.ops;

        let fir = Math.floor(Math.random() * (this.state.max - this.state.min) + this.state.min);//Grab a number between the values
        let sec = Math.floor(Math.random() * (this.state.max - this.state.min) + this.state.min);
        let rop = tops[Math.floor(Math.random() * tops.length)];//Use the length to grab a random symbol.
  
        let ans = "";
        switch(rop){
            case "+":
                ans = fir+sec;
                break;
            case "-":
                ans = fir-sec;
                break;
            case "/":
                if(sec === 0){sec = sec+1}
                ans = Math.round(((fir/sec) + Number.EPSILON) * 100) / 100;
                break;
            case "*":
                ans = fir*sec;
                break;
        }
        this.setState({
            first: fir,
            second: sec,
            op: rop,
            answer: ans
        })

    }


    countDown() {
        let s = this.state.seconds
        if(this.state.type === "table"){
            s = this.state.seconds + 1;
        } else{
            s = this.state.seconds - 1;
        }
        this.setState({seconds : s})
        
        if (this.state.seconds === 0) { 
          clearInterval(this.timer);
          localStorage.setItem("score", this.state.score);

            this.props.history.push("/scores")

        }
      }

    countUp(){
        let s = this.state.seconds + 1;
        this.setState({seconds : s})
    }


    onChange(event) {
		const state = this.state
		state[event.target.name] = event.target.value;
        this.setState(state);
        // console.log(typeof this.state.input)
        // console.log(typeof this.state.answer)
        // console.log(this.state.input === this.state.answer)
        if(this.state.input === this.state.answer+""){
            if(this.state.type === "table"){
                this.getNextTableProblem()
            }else{
                this.getRandomProblem();
            }
            let sco = this.state.score + 1
            this.setState({ 
                input : '',
                score : sco 
        });

        }
        
    }

render() {
        return (
            <div className="container p-2 shadow rounded bg-light">
                <div className="row">
                    <div className="col-2">
                        <h3>Score: {this.state.score}</h3>
                    </div>
                    <div className="col-8 text-center">
                        <h3>{this.state.ops}</h3>
                    </div>
                    <div className="col-2">
                        <h3 className="text-right">Time: {this.state.seconds}</h3>
                    </div>
				</div>
                <div className="text-center mb-4">
                    <h3>{this.state.first + " " + this.state.op + " " + this.state.second}</h3>
                </div>
                <div>
                    <input type="number" name="input" value={this.state.input} onChange={this.onChange} className="form-control" autocomplete="off" autoFocus/>
                </div>
            </div>

        );
    }
}

export default game;
