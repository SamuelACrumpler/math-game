//displays scores
//Load from database, read into object array for the proper

//selects word bank and displays description also name entry

// need to map the scores out.
// Type needs to be scored in local storage, then cleared after the values have been downloaded
import React, { Component } from 'react';
import axios from 'axios';



class score extends Component {
    constructor(props) {
		super(props);
        let url = window.location.href
        let arr = url.split("/");
        let result = arr[0] + "//" + arr[2]
		this.state = {
            word : '',
            input : '',
            scores : [],
            bid : 0,
            bname : '',
            count : 0,
            bank : ['English', 'Spanish', 'Danish'],
            path: result
		}

	
    }

    componentDidMount() {
        console.log(this.state.path + "/api/");
        this.setState({bid : localStorage.getItem("bankID")})
        if(!localStorage.getItem("bankID")){
            this.setState({bname : "!Invalid Bank!"})
            this.props.history.push("/");

        }
        else{
            this.setState({bname : this.state.bank[localStorage.getItem("bankID")]})
            this.saveScore()
        }
    }
    
    saveScore(){
        const bid = localStorage.getItem("bankID");
        const name = localStorage.getItem("name");
        const score = localStorage.getItem("score");
        const words = localStorage.getItem("words");
        console.log("nametest: "+name);
        console.log("score " + score);
        console.log("words " + words);
        localStorage.removeItem("bankID");
        localStorage.removeItem("score");
        localStorage.removeItem("words");



        axios.get(this.state.path + '/api/score/count/' + bid)
            .then(res => {
                this.setState({ count: res.data})
            }).finally(() =>
            {
                if(this.state.count >= 10){
                console.log("count " + this.state.count)
                
                axios.get(this.state.path + '/api/score/board/' + this.state.bid)
                .then(res => {
                    this.setState({scores : res.data})
                }).finally(() => {
                    
                    let s = this.state.scores;
                    console.log("b")
                    console.log(s);

                    s.sort(function (a,b){
                        return a.value - b.value;
                    });
                    console.log("1")

                    console.log(s);


                    let breakcheck = false;

                    for(var i = 0; i <= 30; i++ ){
                        console.log("tick "+i)
                        console.log(s)
                        console.log("scorecheck cur/iscore")
                        console.log(score);
                        console.log(s[i].score)
                        if (breakcheck === true){return;}
                        console.log("breakcheck check:  " + breakcheck)

                        
                        if(score > s[i].score){ //if player makes the high score.
                            axios.put(this.state.path + '/api/score/' + s[i]._id, {bid, name, score, words})
                            breakcheck = true;
                            let ns = {}
                            ns.bid = bid;
                            ns.name = name ;
                            ns.score = score;
                            ns.words = words;
                            s.splice(s.length-1,1)//remove last value in high score board
                            s.push(ns) //add the value to the index
                            s.sort(function (a,b){ //resort
                                return b.score - a.score;
                            });
                            this.setState({scores : s})
                            

                            
                        }
                    }

                })
                    
                    

                } else {
                    //Simply add value
                    axios.post(this.state.path + '/api/score/', {bid, name, score, words})
                        .finally(()=>{
                            this.getScores()
                        }) 
                        

                }
            })
    }

    getScores(){
        axios.get(this.state.path + '/api/score/board/' + this.state.bid)
            .then(res => {
                this.setState({scores : res.data})
            })
    }

    onConfirm() {


        this.props.history.push("/");

    }


render() {
        return (
            <div className="container p-2 rounded bg-light">
                <div className="text-center">
                    <h3>Top Scores For {this.state.bname}</h3>
				</div>
                <div className="">
                    <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Name</th>
                        <th scope="col">Score</th>
                        <th scope="col">Words</th>
                    </tr>
                    </thead>
                    {
                        this.state.scores.map((data, index) => (
                        <tr> 
                            <th key={index}>{index+1}</th>   
                            <td>{data.name}</td>
                            <td>{data.score}</td>
                            <td>{data.words}</td>
                        </tr>
                            )
                        )

                    }
                    </table>
                </div>
                <div>
                    <button class="btn btn-primary w-100" onClick={() => this.onConfirm()}>Return</button>
                </div>
            </div>

        );
    }
}

export default score;
