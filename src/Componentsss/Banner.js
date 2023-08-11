import React, { Component } from 'react'
import axios from 'axios';
import { movies } from './Moviesdata'
export default class Banner extends Component {
    constructor(){
      super();
      this.state={
       bnarr:[],
       i:0
       
      }
    }
     async componentDidMount(){
      var j=Math.floor(
        Math.random() * (20 - 3 + 1) + 3
      );
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${j}`);
      let r=res.data;
      this.setState({
          bnarr:[...r.results],
      });
     }


  render() {
    let movie=movies.results[0]
    return (
      <div classname='bannerout' >
        {
        this.state.bnarr.length==0?
<div className="spinner-border text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
:
<div  ClassName='banner' onClick={()=>this.setState({i:(this.state.i+1)%5})}>
  <img src={`https://image.tmdb.org/t/p/original${this.state.bnarr[this.state.i].backdrop_path}`}   className="card-img-top cardimgb" />
  {/* <div className="card-body"> */}
    <h2 className="card-title card-name">{this.state.bnarr[this.state.i].original_title}</h2>
    <p className="card-text card-overview">{this.state.bnarr[this.state.i].overview}</p>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  {/* </div> */}
</div>
        }
        
      </div>
    )
  }
}
