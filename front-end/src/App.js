import React, { Component } from 'react';
import './style.css';
import axios from 'axios'


class App extends Component {

  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
      avgBill: "",
      startText: "", 
      infoCards: [],

    }
    this.handleChange=this.handleChange.bind(this)
  }
  
      handleChange(key, e) {
        this.setState({ 
          [key]: e.target.value
        });


      }
  componentDidMount() {
    axios.get(`/getInfo`)
      .then((res) => {
        this.setState({
          startText: res.data
      })
    })
  }
      handleSubmit(event) {
        let data = {
          name: this.state.name,
          email: this.state.email,
          avgBill: this.state.avgBill,

        }
        axios.post('/api/submit', data )
          .then((response) => {
            this.setState({
              infoCards: [response.data]
            })
          })
          .catch((error) => {
            console.log(error)
          })

      }

  render() {
    let notStyled = this.state.startText;
    let styled = this.state.startText;
    if (this.state.startText.length > 0) {
      let arr = this.state.startText.split(" ")
      styled = arr.pop()
      arr.pop();
      notStyled = arr.join(" ");
    } 
      
    const infoCards = this.state.infoCards.map((info) => {
      return ( 
        <div key={info.id}> 
          <p>{info.billSummary}</p>
      </div>
    )
  })

        return (
          <div> 
        
            <header className="header">
              
            </header>
            <div className="body-container">
              <div className="SignupContainer">
                <div className="H1">
                  <h1>{notStyled}<span className="savings"> {styled}</span></h1>
                </div>
                  <div className="twitter-people">
                    <h3>Fill out info below to find out!</h3>

                  </div>
                <div className="label-input" id="Full-Name">

                  <input type="text" value={this.state.name} onChange={e => this.handleChange('name', e)} placeholder="Full Name" />
                </div>
                <div className="label-input" id="Email-Phone">
                  <input type="text" value={this.state.email} onChange={e =>this.handleChange('email', e)} placeholder="Email or Phone" />

                </div>

                <div>
                  <div>
                  
                    <select className="dropbtn" onChange={e => this.handleChange('avgBill', e)} >
                    <option>Choose a bill amount</option>  
                      <option>$50-$100</option>
                      <option>$100-$150</option>
                      <option>$150-$200 </option>
                    </select>
                  </div>
                </div>


                <div className="button">
                  <button onClick={e => this.handleSubmit()} className="GoSolar-Button">Submit</button>
                </div>
              </div>
              
            </div>
            <div className ="info-card">
              {infoCards}
            </div>
            
            </div>  
        );
      }
    }


    export default App;
