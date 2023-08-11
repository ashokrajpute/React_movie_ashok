import React, { Component } from 'react'
import Navbar from './Navbar';
import Banner from './Banner';
import List from './List';
import Favourites from './Favourites';
import Foot from './Foot';
import Trend from './Trend';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

export default class Kall extends Component {
   constructor(){
      super();
      this.state={
     col:'white',
     prev:'white'
      }
   }
   

  render() {
    return (

      <div className={this.state.col}>
         <nav style={{display:'flex',backgroundColor:'white',height:'5vh'}}>
       <div style={{backgroundColor:'red',width:'1rem',height:'1rem',borderRadius:'50%',position:'relative',top:'1vh',left:'1vw' }} onClick={()=>this.setState({prev:this.state.col,col:'red'})}> </div>
       <div style={{backgroundColor:'black',width:'1rem',height:'1rem',borderRadius:'50%',position:'relative',top:'1vh',left:'1.2vw'}} onClick={()=>this.setState({prev:this.state.col,col:'black'})}> </div>
       <div style={{backgroundColor:'white',width:'1rem',height:'1rem',borderRadius:'50%',position:'relative',top:'1vh',left:'1.4vw',border:'0.5px solid black'}} onClick={()=>this.setState({prev:this.state.col,col:'white'})}> </div>
       <div style={{backgroundColor:'#F0CFCD',width:'1rem',height:'1rem',borderRadius:'50%',position:'relative',top:'1vh',left:'1.6vw'}} onClick={()=>this.setState({prev:this.state.col,col:'blue'})}> </div>
       <div style={{backgroundColor:'#ddffee',width:'1rem',height:'1rem',borderRadius:'50%',position:'relative',top:'1vh',left:'1.8vw'}} onClick={()=>this.setState({prev:this.state.col,col:'new'})}> </div>
       
        </nav> 
         <Router>
       <Navbar/>
       <Routes>
        <Route path='/' exact element={
        <><Banner/>
        <List/></>
           
        
        }/>
      <Route path='/fav' exact element={<Favourites/>} />
      <Route path='/tren' exact element={<Trend/>} />
       </Routes>
       <Foot/>
    </Router> 
      </div>
    )
  }
}
