import  React, { Component, Fragment }  from 'react';
import  { connect }                     from 'react-redux';
import   * as actions                   from '../actionsDirectory/actions';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'







 class welcomeContainer extends Component{

    constructor(){
        super()
        this.state = {
           userInfo: {
               name:     null,
               email:    null,
               shortBio: null
           }
        }
    }

    setUserInfo = (e) => {
      
      if(e.currentTarget.id === "name"){
          this.setState ({
             userInfo: {
                 ...this.state.userInfo,
                 name: e.currentTarget.value
             }
          })
      }else if (e.currentTarget.id === "email"){
          this.setState({
        userInfo: {
            ...this.state.userInfo,
            email: e.currentTarget.value
        }
    })
        
      }else if (e.currentTarget.id === "bio"){
        this.setState ({
        userInfo: {
            ...this.state.userInfo,
            shortBio: e.currentTarget.value
        }
    })
        }
      }
    
    logInUser = () => {
         
        let findUser = this.props.users.find(user => user.name === this.state.userInfo.name)

        if(findUser !== undefined){
            this.props.setCurrentUser(findUser)
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
                }
         }
      
      

      postUser = () => {
  
        let objectConfig = {
            method: 'POST',
            headers: {
               'Content-Type':'application/json'
            }, 
            body: JSON.stringify({
              name: this.state.userInfo.name,
              email: this.state.userInfo.email,
              short_bio: this.state.userInfo.shortBio,
              img: 'https://i.imgur.com/e225YR5.jpg'
            })
        }
            fetch('http://localhost:3000/users', objectConfig)
            .then(res => res.json())
            .then(user =>{this.props.setCurrentUser(user)})
            
        }
      

    render(){

        return (
            <Fragment>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
        Sign up
        </button>

        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Sign Up</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="false">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input id='name' placeholder="Name" type='text' onChange={(e) => this.setUserInfo(e)}/>
             <p></p>
             <input id='email' placeholder='E-mail' type='text' onChange={(e) => this.setUserInfo(e)}/>
             <p></p>
             <i>Tell us something about yourself!</i> 
             <p></p>
             <textarea id='bio' type='text-box' rows="5" cols="50" onChange={(e) => this.setUserInfo(e)}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <div onClick={(e) => this.postUser(e)}>
              <NavLink to='/home'  className="glyphicon glyphicon-lock"  type="submit" >Sign Up</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="button" className="btn btn-primary" data-toggle="modal"  data-target="#exampleModalCenter2">
        Log In
        </button>

        <div className="modal fade" id="exampleModalCenter2"  tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className=" modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Log In</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input id='name' placeholder='name' onChange={(e) => this.setUserInfo(e)}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <div onClick={() => this.logInUser()}>
              <NavLink to='/home'  className="glyphicon glyphicon-lock"  type="submit" >Log in</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Fragment>

        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (user) => dispatch(actions.setCurrentUser(user))
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(welcomeContainer);

