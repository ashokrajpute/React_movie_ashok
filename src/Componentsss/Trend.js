import React, { Component } from 'react'
import axios from 'axios'

export default class Trend extends Component {
  constructor(){
    super();
    this.state={
        moviesarr:[],
       
        currsrch:'',
        reparr:[],
        nrow:10
        }
  }
  async componentDidMount(){
     let r=[];
   for(var i=1;i<20;i++){
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${i}`);
     
    for(var j=0;j<res.data.results.length;j++)
     {r.push(res.data.results[j]);}
    
    }
   console.log(r.length);
   r.sort(function (a, b) { return b.popularity - a.popularity });
   let p=[];
    for(var i=0;i<this.state.nrow;i++){
     p.push(r[i])
    }
    this.setState({
      moviesarr:[...r],
      reparr:[...p]
    })
 //console.log(this.state.moviesarr.length);

    

  }

  favdecpop = () => {
    let t = [...this.state.reparr];

    t.sort(function (a, b) { return b.popularity - a.popularity });
    this.setState({
      reparr: [...t]
    })

  }
  favincpop = () => {
    let t = [...this.state.reparr];

    t.sort(function (a, b) { return a.popularity - b.popularity });
    this.setState({
      reparr: [...t]
    })
  }
  favdecrat = () => {
    let t = [...this.state.reparr];

    t.sort(function (a, b) { return b.vote_average - a.vote_average });
    this.setState({
        reparr: [...t]
    })

  }
  favincrat = () => {
    let t = [...this.state.reparr];

    t.sort(function (a, b) { return a.vote_average - b.vote_average });
    this.setState({
        reparr: [...t]
    })
  }

  makesrch = (val) => {
    val = val.toLowerCase();
    if (val == '') {
        let p=[];
    for(var i=0;i<this.state.nrow;i++){
     p.push(this.state.moviesarr[i])
    }
    
      this.setState({
        currsrch: val,
         reparr:[...p],
      });

    } else {
      let t = this.state.reparr.filter((m) => {
        if (m.title.toLowerCase().includes(val)) return m;
      })
      this.setState({
        currsrch: val,
        reparr: [...t],
       
      })
    }


  }
   makerow = (n) => {

    n = parseInt(n);
  if(n>380){n=380;}
    let pq = []; 

    for (let i = 1; i <=n ; i++) {
      pq.push(this.state.moviesarr[i-1]); 
    }
    
    this.setState({
      nrow: n,
      reparr:[...pq]

    })



  }

  render() {
    let genreids = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
        27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
      };
    
    return (
      <div>
       <div className="col-10">

<div class="input-group flex-nowrap " >
  <input type="text" class="form-control col-5" placeholder="Search" value={this.state.currsrch} onChange={(e) => this.makesrch(e.target.value)} aria-label="Username" aria-describedby="addon-wrapping" style={{ background: 'lightgrey', outline: '1px solid black' }} />
  <input type="Number" class="form-control col-5" placeholder="Rows" value={this.state.nrow} onChange={(e) => this.makerow(e.target.value)} aria-label="Username" aria-describedby="addon-wrapping" style={{ background: 'lightgrey', outline: '1px solid black' }} />
 </div>
{/* ///////////////////////// */}
<table class="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Title</th>
      <th scope="col">Genre</th>
      <th scope="col"><i class="fa fa-caret-up" onClick={this.favdecpop} />Popularity<i class="fa fa-caret-down" onClick={this.favincpop} /></th>
      <th scope="col"><i class="fa fa-caret-up" onClick={this.favdecrat} />Rating<i class="fa fa-caret-down" onClick={this.favincrat} /></th>
     
    </tr>
  </thead>
  <tbody>
    {
      this.state.reparr.map((data,idx) => (
        <tr>
           <th>{idx+1}</th>
          <th className='col-6' style={{ textAlign: "left" }}><img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} align={"left"} style={{ width: '7rem' }} />{data.title}</th>
          <td>{genreids[data.genre_ids[0]]}</td>
          <td>{data.popularity}</td>
          <td>{data.vote_average}</td>
          </tr>
      ))


    }
    {/* ================= */}
    
  </tbody>
</table>
</div>
      </div>
    )
  }
}
