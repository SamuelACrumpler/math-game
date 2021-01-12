import React, { Component } from 'react';

class main extends Component {
    constructor(props) {
		super(props);

		this.state = {
            name : '',
            ops : [false, false, false, false],
            from : '',
            to : '',
            error: ''
        }
        
        this.onChange = this.onChange.bind(this);
        this.onInput = this.onInput.bind(this);


	
    }

    componentDidMount() {
        this.doesNameExist();

        
	}

    doesNameExist() {
		if (localStorage.getItem("name") !== "" || localStorage.getItem("name") !== null) { 
			this.setState({name: localStorage.getItem("name")}) 
		}
	}


    onChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        console.log(event.target.type);
		this.setState(state);
    }

    onInput(event){
        const state = this.state;

        const regex = /^[0-9\b]+$/;
      const value = event.target.value;
      console.log("vc: " + value )

      if (value === '' || regex.test(value)) {
          console.log("reggy works")
          state[event.target.name] = value
          this.setState(state);
      } else {
          return;
      }

      
       
    }

  
    enableOperation(val){
        let temp = this.state.ops;
        if(val !== 4){
            temp[val] = !temp[val]; //Swaps the boolean value
            
            temp[4] = false;
            if(!document.getElementById("btn"+4).classList.contains("disabled")){
                document.getElementById("btn"+4).classList.add("disabled")
            }
            this.checkButton(val);
            this.setState({ops : temp})
        } else if (val === 4){
            for(var i = 0; i <= 3; i++){
                temp[i] = false;
                if(!document.getElementById("btn"+i).classList.contains("disabled")){
                    document.getElementById("btn"+i).classList.add("disabled")
                }
            }
            temp[4] = true;
            if(document.getElementById("btn"+4).classList.contains("disabled")){
                document.getElementById("btn"+4).classList.remove("disabled")
            }
        }
        

        
        console.log(this.state.ops);
        console.log(this.state.ops[0] + this.state.ops[1])
        console.log(""+this.state.ops[0]+this.state.ops[1])
    }

    checkButton(val){
        if(document.getElementById("btn"+val).classList.contains("disabled")){//remove if true
            document.getElementById("btn"+val).classList.remove("disabled")
        } else{// add if true
            document.getElementById("btn"+val).classList.add("disabled")

        }

    }

    
    
    onConfirm() {
        const ops = this.state.ops;
        try{
            if(this.state.name === "") throw "Name is blank."
            if(this.state.from === "") throw "From number value is blank."
            if(this.state.to === "") throw "To number value is blank."
            if(typeof parseInt(this.state.from) !==  "number") throw "The value in the From input is not a number."
            if(typeof parseInt(this.state.to) !==  "number") throw "The value in the To input is not a number."
            if(this.state.from >= this.state.to) throw "From number value most be lower than the To number value."
            if(this.state.to <= this.state.from) throw "To number value most be higher than the From number value."
            if((ops[0]+ops[1]+ops[2]+ops[3]+ops[4]) === 0 ) throw "Select the game options before proceeding."

        }catch(err){
            this.setState({error: err})
            if (document.getElementById("error") !== null) {
                document.getElementById("error").classList.remove('d-none');
            }
            return;
        }

		localStorage.setItem("name", this.state.name);
        localStorage.setItem("garr", this.state.ops);
        localStorage.setItem("from", this.state.from);
        localStorage.setItem("to", this.state.to);

        this.props.history.push("/game");

    }


render() {
        return (
            <div className="container p-2 rounded bg-light">
                <div className="row">
                    <div className="col mb-3">
				    	<input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.onChange} className="form-control" />
                    </div>
				</div>
                <div className="row col mb-3 m-0 p-0">

                    
                    <div className="col-12 text-center">
                        <h1>Math Game</h1>
                    </div>

                </div>
                <div className="text-center">
                    <p>A simple math game. The player chooses the operations they want to practice with. For example clicking on addition and subtraction would only produce addition and subtraction problems.
                    Solutions for the problems can go into the negative values, and the game will avoid dividing by zero. If the number would result in a decimal value, it will be rounded up to the second decimal point.
                    The player would have a total of 60 seconds to score as high as they can. The high scores will be stored based on the operations the player selects. For example there is a separate score board for addition, and addition with subtraction.     
                        <br /> <br />The multiplication table option will go through all possible problems from the start of the number range, to the end of it. For example if the number range is set at 1 to 12, the first problem will be 1x1, the last will be 12x12.
                        On the multiplication table there will be 5 seconds added for each problem, also the scoreboard will be entirely localized </p>
                </div>
                <div className="row col mb-3 m-0 p-0">
                    <div className="col-12 text-center">
                        <h3>Click on the buttons below to set the game mode.</h3>
                    </div>
                    
                    <div className="col-12 text-center">
                        
                    <button id="btn0" class="btn btn-primary ml-1 mr-1 disabled" onClick={() => this.enableOperation(0)}>+</button>
                    <button id="btn1" class="btn btn-primary ml-1 mr-1 disabled" onClick={() => this.enableOperation(1)}>-</button>
                    <button id="btn2" class="btn btn-primary ml-1 mr-1 disabled" onClick={() => this.enableOperation(2)}>/</button>
                    <button id="btn3" class="btn btn-primary ml-1 mr-1 disabled" onClick={() => this.enableOperation(3)}>*</button>

                    </div>

                </div>
                <div className="row col mb-3 m-0 p-0">

                    
                    <div className="col-12 text-center">
                        
                    <button id="btn4" class="btn btn-primary ml-1 mr-1 disabled" onClick={() => this.enableOperation(4)}>Multiplication Tables</button>

                    </div>

                </div>
                <div className="row col mb-3 m-0 p-0">

                    
                    <div className="col-12 text-center">
                    <h3>Number Range</h3>
                    <p></p>
                        
                    

                    </div>

                    <div className="col-md-6">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">From</span>
                            </div>
                    
                        <input value={this.state.from} name="from"  onInput={this.onInput}  class="form-control" placeholder="" aria-label="From" aria-describedby="basic-addon1"/>
                        </div>
                        
                    </div>

                    <div className="col-md-6">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon2">To</span>
                        </div>
                        <input value={this.state.to} name="to"  onInput={this.onInput}  class="form-control" placeholder="" aria-label="To" aria-describedby="basic-addon2"/>
                        </div>
                    </div>

                   

                    

                </div>
                <div id="error" className="alert alert-danger text-center d-none">
                Error: {this.state.error}

                </div>
                <button class="btn btn-primary w-100" onClick={() => this.onConfirm()}> Submit</button>
            </div>

        );
    }
}

export default main;