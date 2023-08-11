import React, { Component } from 'react'
//import { movies } from './Moviesdata'
export default class Favourites extends Component {

  constructor() {
    super();
    this.state = {
      temp: ['GENRES'],
      active: 'GENRES',
      movies1: [],
      Almovies: [],
      currsrch: '',
      pgar: [1, 2, 3],
      nrow: 5,
      pgno: 1

    }


  }
  componentDidMount() {
    let genreids = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };

    //console.log("cdm");
    let m = JSON.parse(localStorage.getItem('reactmovies') || '[]');

    let t = [];
    t.push('GENRES')
    for (let i = 0; i < m.length; i++) {
      if (!t.includes(genreids[m[i].genre_ids[0]])) { t.push(genreids[m[i].genre_ids[0]]); }

    }
    let pq = []; let j = 1;
    for (let i = 0; i < m.length; i += this.state.nrow) {
      pq.push(j); j++;
    }



    this.setState({
      Almovies: [...m],
      movies1: [...m],
      temp: [...t],
      pgar: [...pq]

    })



  }
  changeList = () => {
    let genreids = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };

    let t = []; let mv = this.state.Almovies;
    if (this.state.active != 'GENRES') {

      for (let i = 0; i < mv.length; i++) {
        if (genreids[mv[i].genre_ids[0]] == this.state.active) { t.push(mv[i]); }
      }
      this.setState({
        movies1: [...t]

      }, () => this.makerow(this.state.nrow))

    }
    else {

      this.setState({
        movies1: [...this.state.Almovies]

      }, () => this.makerow(this.state.nrow))

    }




  }
  makeactive = (mtype) => {


    if (this.state.active != mtype) {
      this.setState({
        active: mtype,
        pgno: 1
      }, this.changeList)
    }
    else {
      this.changeList();
    }


  }
  deletemovie = (mv) => {
    let genreids = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };

    let t = this.state.Almovies.filter((m) => {
      if (mv.id != m.id) return m;
    })
    let t2 = this.state.movies1.filter((m) => {
      if (mv.id != m.id) return m;
    })
    let t3 = ['GENRES']
    let l = this.state.temp.length;
    t.filter((m) => {
      if (!t3.includes(genreids[m.genre_ids[0]])) {
        t3.push(genreids[m.genre_ids[0]])
      }

    })

    localStorage.setItem('reactmovies', JSON.stringify(t));
    if (l != t3.length) {
      this.setState({
        Almovies: [...t],
        movies1: [...t2],
        temp: [...t3]
      }, () => this.makeactive('GENRES'),)
        ;

    }
    else {
      this.setState({
        Almovies: [...t],
        movies1: [...t2]
      }, () => this.changeList())
    }




  }
  favdecpop = () => {
    let t = [...this.state.movies1];

    t.sort(function (a, b) { return b.popularity - a.popularity });
    this.setState({
      movies1: [...t]
    })

  }
  favincpop = () => {
    let t = [...this.state.movies1];

    t.sort(function (a, b) { return a.popularity - b.popularity });
    this.setState({
      movies1: [...t]
    })
  }
  favdecrat = () => {
    let t = [...this.state.movies1];

    t.sort(function (a, b) { return b.vote_average - a.vote_average });
    this.setState({
      movies1: [...t]
    })

  }
  favincrat = () => {
    let t = [...this.state.movies1];

    t.sort(function (a, b) { return a.vote_average - b.vote_average });
    this.setState({
      movies1: [...t]
    })
  }
  makesrch = (val) => {
    val = val.toLowerCase();
    if (val == '') {
      this.setState({
        currsrch: val,
        pgno: 1
      }, this.changeList);

    } else {
      let t = this.state.Almovies.filter((m) => {
        if (m.title.toLowerCase().includes(val)) return m;
      })
      this.setState({
        currsrch: val,
        movies1: [...t],
        pgno: 1
      }, () => this.makerow(this.state.nrow), this.makeactive('GENRES'))
    }


  }
  makerow = (n) => {

    let pq = []; let j = 1;

    for (let i = 1; i <= Math.ceil(this.state.movies1.length / n); i++) {
      pq.push(j); j++;
    }
    n = parseInt(n);
    this.setState({
      nrow: n,
      pgar: [...pq],

    })



  }


  setpage = (n) => {
    n = parseInt(n);
    this.setState({
      pgno: n
    })

  }

  render() {

    let genreids = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };

    // for(let i=0;i<this.state.movies1.length;i++){
    //  if(!this.state.temp.includes(genreids[movie[i].genre_ids[0]])){this.state.temp.push(genreids[movie[i].genre_ids[0]]);}

    // }

    let tempmovies = []; let o = (this.state.pgno - 1) * this.state.nrow; let k = this.state.nrow + o;
    // console.log(this.state.nrow);
    // console.log("=>",o,k);
    for (let i = o; i < o + this.state.nrow && i < this.state.movies1.length; i++) {
      tempmovies.push(this.state.movies1[i]);
    }

    //console.log(this.state.temp);

    //console.log("==>"+movie.length);
    return (
      <div>
        <div className="container text-center">
          <div className="row align-items-start">
            {/* ================== */}
            <div className="col-2">
              <ul class="list-group">
                {/* <li class="list-group-item active" aria-current="true"><strong>Genres</strong></li> */}
                {
                  this.state.temp.map((mtype) => (
                    (mtype == this.state.active) ? <li class="list-group-item active" onClick={() => this.makeactive(mtype)}>{mtype}</li> :
                      <li class="list-group-item" onClick={() => this.makeactive(mtype)}>{mtype}</li>
                  ))


                }

              </ul>
            </div>
            {/* ///==================== */}
            <div className="col-10">

              <div class="input-group flex-nowrap " >
                <input type="text" class="form-control col-5" placeholder="Search" value={this.state.currsrch} onChange={(e) => this.makesrch(e.target.value)} aria-label="Username" aria-describedby="addon-wrapping" style={{ background: 'lightgrey', outline: '1px solid black' }} />
                <input type="Number" class="form-control col-5" placeholder="Rows" value={this.state.nrow} onChange={(e) => this.makerow(e.target.value)} aria-label="Username" aria-describedby="addon-wrapping" style={{ background: 'lightgrey', outline: '1px solid black' }} />
              </div>
              {/* ///////////////////////// */}
              <table class="table">
                <thead>
                  <tr>

                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col"><i class="fa fa-caret-up" onClick={this.favdecpop} />Popularity<i class="fa fa-caret-down" onClick={this.favincpop} /></th>
                    <th scope="col"><i class="fa fa-caret-up" onClick={this.favdecrat} />Rating<i class="fa fa-caret-down" onClick={this.favincrat} /></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tempmovies.map((data) => (
                      <tr>
                        <th className='col-6' style={{ textAlign: "left" }}><img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} align={"left"} style={{ width: '7rem' }} />{data.title}</th>
                        <td>{genreids[data.genre_ids[0]]}</td>
                        <td>{data.popularity}</td>
                        <td>{data.vote_average}</td>
                        <td><button type="button" class="btn btn-danger" onClick={() => this.deletemovie(data)}>Delete</button></td>
                      </tr>
                    ))


                  }
                  {/* ================= */}
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      {
                        this.state.pgar.map((i) => (<li class="page-item"><a class="page-link" href="#" onClick={() => this.setpage(i)}>{i}</a></li>))
                      }



                    </ul>
                  </nav>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
