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
            gid : '',
            bname : '',
            count : 0,
            gametype : "",
            table : false,
            path: result
		}

	
    }

    componentDidMount() {
        console.log(this.state.path + "/api/");
        if(localStorage.getItem("garr") === null || !localStorage.getItem("garr")){this.props.history.push("/"); return;}
        const garr = localStorage.getItem("garr").split(',');
        const min = localStorage.getItem('min');
        const max = localStorage.getItem('max')
        let id = "";
        let type = [];
        if(garr[4] === "true"){
            console.log("tabletime")
            id = "m"+min+"*"+max;
            this.setState({table : true})
            //mul table run
        } else {
            if(garr[0] === 'true'){
                type.push("A")
            }
            if(garr[1] === 'true'){
                type.push("S")
            }
            if(garr[2] === 'true'){
                type.push("D")
            }
            if(garr[3] === 'true'){
                type.push("M")
            }
            console.log(type)
            this.setState({table : false})

            for(var i = 0; i < type.length; i++){
                    id = id + type[i]+"";
                
            }
            id = id + 'R' + min + '-' + max;
        }
        console.log("test" + id)
        this.setState({gid : id}, () => {
            this.saveScore();
        }) 
        
 
    }
    
    saveScore(){
        const table = this.state.table
        const gid = this.state.gid
        const name = localStorage.getItem("name");
        const score = localStorage.getItem("score");
        let timer = null;
        if(localStorage.getItem("seconds")){
           timer = parseInt(localStorage.getItem("seconds"));

        }
        console.log("nametest: "+name);
        console.log("score " + score);
        console.log("id " + this.state.gid);
        localStorage.removeItem("score");
        localStorage.removeItem("seconds");
        localStorage.removeItem("garr");



        axios.get(this.state.path + '/api/score/count/' + gid)
            .then(res => {
                this.setState({ count: res.data}) //the amount of entries per ID
            }).finally(() =>
            {
                if(this.state.count >= 10){//If the count is 10 or greater avoid adding values, and instead swap one out.
                console.log("count " + this.state.count)
                
                    axios.get(this.state.path + '/api/score/board/' + gid)
                    .then(res => {
                        this.setState({scores : res.data})
                    }).finally(() => {
                        
                        let s = this.state.scores;

                        console.log("b")
                        console.log(s);

                        //Should be able to ignore this sorting
                        s.sort(function (a,b){
                            return a.timer - b.timer;
                        });

                        console.log("1")

                        console.log(s);

                        let breakcheck = false;

                        if(table === true){
                            for(var i = 9; i !== 0; i-- ){
                                console.log("tick "+i)
                                console.log(s)
                                console.log("scorecheck cur/iscore")
                                console.log(score);
                            console.log(s[i].score)
                                if (breakcheck === true){return;}
                                console.log("breakcheck check:  " + breakcheck)
        
                                
                                if(timer < s[i].timer && table === true ){ //if player makes the high score.
                                    console.log("timer sort");
                                    axios.put(this.state.path + '/api/score/' + s[i]._id, {gid, name, score, timer})
                                    breakcheck = true;
                                    let ns = {}
                                    ns.gid = gid;
                                    ns.name = name ;
                                    ns.score = score;
                                    ns.timer = timer;
                                    console.log(s);
                                    s.sort(function (a,b){ //resort
                                        return a.timer - b.timer;
                                    });
                                    console.log(s);
        
                                    s.splice(s.length-1,1)//remove last value in high score board
                                    s.push(ns) //add the value to the index
                                    s.sort(function (a,b){ //resort
                                        return a.timer - b.timer;
                                    });
                                    for(var i = 0; i < s.length; i++){
                                        s[i].score = "----"
                                    }
                                    console.log(s);
        
                                    this.setState({scores : s})
                                    
                                }
                            }

                            if (breakcheck === false){
                                let s = this.state.scores;
                                s.sort(function (a,b){
                                    return a.timer - b.timer;
                                });
                                for(var i = 0; i < s.length; i++){
                                    s[i].score = "----"
                                }
                                this.setState({scores : s})
                            }

                        }else if(table === false){
                            for(var i = 0; i < 10; i++ ){
                                console.log("tick "+i)
                                console.log(s)
                                console.log("scorecheck cur/iscore")
                                console.log(score);
                                 console.log(s[i].score)
                                if (breakcheck === true){return;}
                                console.log("breakcheck check:  " + breakcheck)
        
                                
                                if(score > s[i].score && table === false ){ //if player makes the high score, and not multiplication table
                                    axios.put(this.state.path + '/api/score/' + s[i]._id, {gid, name, score, timer})
                                    breakcheck = true;
                                    let ns = {}
                                    ns.gid = gid;
                                    ns.name = name ;
                                    ns.score = score;
                                    ns.timer = timer;
                                    s.splice(s.length-1,1)//remove last value in high score board
                                    s.push(ns) //add the value to the index
                                    s.sort(function (a,b){ //resort
                                        return b.score - a.score;
                                    });
                                    for(var i = 0; i < s.length; i++){
                                        s[i].timer = "----"
                                    }
                                    this.setState({scores : s})
                                    
                                }
                            }
                        }

                        
                        if (breakcheck === false){
                            let s = this.state.scores;
                            s.sort(function (a,b){
                                return b.score - a.score;
                            });
                            for(var i = 0; i < s.length; i++){
                                s[i].timer = "----"
                            }
                            this.setState({scores : s})
                        }
                    })
                } else if((table === false && score !== null) || (table === true && timer !== null)) {//if player has a score while doing random operations mode, or  if player is doing the multiplication table and has a timer set. Prevents empty values from being added.
                    //Simply add value
                    axios.post(this.state.path + '/api/score/', {gid, name, score, timer})
                        .finally(()=>{
                            this.getScores()
                        }) 
                        

                }
            })
    }

    getScores(){
        axios.get(this.state.path + '/api/score/board/' + this.state.gid)
            .then(res => {
                let r = res.data
                console.log(this.state.table)
                if(this.state.table === false){
                    r.sort(function (a,b){ //resort
                        return b.score - a.score;
                    });
                    for(var i = 0; i < r.length; i++){
                        r[i].timer = "----"
                    }
                    
                } else {
                    console.log("sort timer")
                    r.sort(function (a,b){ //resort
                        return a.timer - b.timer;
                    });
                    for(var i = 0; i < r.length; i++){
                        r[i].score = "----";
                    }
                }
                this.setState({scores : r})
            })
    }

    onConfirm() {


        this.props.history.push("/");

    }


render() {
        return (
            <div className="container p-2 shadow rounded bg-light">
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
                        <th scope="col">Time</th>
                    </tr>
                    </thead>
                    {
                        this.state.scores.map((data, index) => (
                        <tr> 
                            <th key={index}>{index+1}</th>   
                            <td>{data.name}</td>
                            <td>{data.score}</td>
                            <td>{data.timer}</td>
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
