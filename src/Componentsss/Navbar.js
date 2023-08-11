import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',marginTop:"0.5rem",marginLeft:'1rem',justifyContent:'space-evenly'}}>
      <Link to="/" style={{textDecoration:'none',color:'#c0cbcd'}}><h3>+Allmovies</h3></Link>
      <Link to="/fav" style={{textDecoration:'none',color:'#c0cbcd'}}><h3 >+Favourite</h3></Link>
      <Link to="/Tren" style={{textDecoration:'none',color:'#c0cbcd'}}><h3 >+Trending</h3></Link>
      </div>
    )
  }
}
