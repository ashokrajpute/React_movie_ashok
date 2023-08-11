import React, { Component } from 'react'
import axios from 'axios'
import Disp from './Disp';
import { movies } from './Moviesdata';
//import { movies } from './Moviesdata'
export default class List extends Component {
    constructor(){
    super();
    this.state={
    pgarr:[1],
    currpg:1,
    movies:[],
    fav:[],
    over:"",
    id:''
    }

    }
    async componentDidMount(){
     
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currpg}`);
      let r=res.data;
      let t=JSON.parse(localStorage.getItem("reactmovies")||'[]');
      t=t.map((m)=>(m.id))
      //console.log(r);
      this.setState({
        movies:[...r.results],
        fav:[...t]
      })
   console.log(this.state.movies.length);

    }
    listupdate=async()=>{
      //console.log(this.state.currpg);
      //console.log(this.state.pgarr.length);
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currpg}`);
      let r=res.data;
      this.setState({
        movies:[...r.results],
      })
     

    }
    listinc=()=>{
   let temp=[];
   for(let i=1;i<=this.state.pgarr.length+1;i++){
    temp.push(i);
   }
   

       (this.state.currpg===this.state.pgarr.length)?
       
        this.setState({
        pgarr:[...temp],
        currpg:this.state.currpg+1

      },this.listupdate)
       :
       this.setState({
        
        currpg:this.state.currpg+1

      },this.listupdate);

     


    }
    listdec=()=>{
      if(this.state.currpg!=1){
        let temp=[];
        for(let i=1;i<=this.state.pgarr.length-1;i++){
         temp.push(i);
        }
        
     
            (this.state.currpg===this.state.pgarr.length)?
            
             this.setState({
             pgarr:[...temp],
             currpg:this.state.currpg-1
     
           },this.listupdate)
            :
            this.setState({
             
             currpg:this.state.currpg-1
     
           },this.listupdate);


      }


    }
    listpg=(val)=>{
      this.setState({
             
        currpg:val

      },this.listupdate);


    }
   handlefav=(mov)=>{
   // console.log(mov);
    let oldata=JSON.parse(localStorage.getItem('reactmovies')||'[]');
    if(!this.state.fav.includes(mov.id)){
      let t=[...this.state.fav];
      t.push(mov.id);
      oldata.push(mov);
      localStorage.setItem("reactmovies",JSON.stringify(oldata))
       this.setState({
        fav:[...t]
       })
    }
    else{
  let t=this.state.fav.filter((val)=>{
   if(val!=mov.id){return val;}
  });
  oldata=oldata.filter((m)=>{
    if(m.id!=mov.id)return m;
  })
  localStorage.setItem("reactmovies",JSON.stringify(oldata))
  this.setState({
   fav:[...t]
  })
    }
    

   }
//    printkn=(mov)=>{
//     console.log(this.state.fav);
//  let oldata=JSON.parse(localStorage.getItem('reactmovies')||'[]');
//  if(oldata.includes())
//    olddata=[...this.state.fav];
//     localStorage.setItem("reactmovies",JSON.stringify(olddata))
//    }
handleClickToOpen=(dataid)=>{
  
 if(this.state.id==dataid){
  this.setState({
    id:""
   })
   
 }
 else{
  this.setState({
   
    id:dataid
   })
 
 }

}
  
  render() {
    //let movie=movies.results;//
    return (
      <div>
        <h1 style={{textAlign:'center',paddingTop:'1rem',color:'#c0cbcd'}}>TRENDING</h1>
        <ul className='list1'>{
          this.state.movies.map((data)=>(
           
            ('null'===data.backdrop_path)?
            <div className="spinner-border text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
            :
<div className='movieblock 'onMouseEnter={()=>this.setState({over:data.id})} onMouseLeave={()=>this.setState({over:'',id:''})} >
  <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}  className="card-img-top cardimgl" alt='NOT PRESENT 😓'/>
  
    <h2 className="card-title card-name1">{data.original_title}</h2>
    <button className='info' onClick={()=>this.handleClickToOpen(data.id)}>
        {data.id==this.state.id?
        (
        <div className='movieblockinfo'>
       {data.overview}
      </div>):null
        }
    </button>
   
    <div  className='buttonwrapper '>
      {      (this.state.over==data.id)?
              <a href="#" className="btn btn-primary favbtn" onClick={()=>this.handlefav(data)}>{this.state.fav.includes(data.id)?"Remove from Fav":"Add To fav"}</a>
             :
             null
      }
   
      
    </div>
 
</div>

          ))

        }
        </ul>
  
        <nav aria-label="Page navigation example" style={{paddingLeft:"33.6rem"}}>
  <ul className="pagination" style={{alignContent:'center'}}>
    <li className="page-item"><a className="page-link" href="#" onClick={this.listdec}>Previous</a></li>
    {
      this.state.pgarr.map((value)=>(
<li className="page-item"><a className="page-link" href="#"onClick={()=>this.listpg(value)}>{value}</a></li>
      ))
      
    }
    
    <li className="page-item"><a className="page-link" href="#" onClick={this.listinc}>Next </a></li>
  </ul>
</nav>

      </div>
    )
  }
}
