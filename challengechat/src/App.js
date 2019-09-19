// App.js -- this is  the full file
import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {

  state = {
    isConnected:false,
    id: null,
    peeps:[]
    
  }
  
  socket = null

  componentWillMount(){

    this.socket = io('https://codi-server.herokuapp.com');

    this.socket.on('connect', () => {
        this.setState({isConnected:true})
       })
   
       this.socket.on('pong!',()=>{
        console.log('the server answered!')
      })
      this.socket.on('pong!',(additionalStuff)=>{
        console.log('server answered!', additionalStuff)
      })
      


    this.socket.on('disconnect', () => {
      this.setState({isConnected:false})
      
    })
    
    this.socket.on('youare',(answer)=>{
      this.setState({id:answer.id})
    })

    this.socket.on('new connection',newConnection=>{
       this.state.peeps.push(newConnection+ "new");
      console.log("salam",newConnection)
    })
    this.socket.on('new disconnection',newdisconnection =>{
      this.state.peeps.pop();
     console.log("ssssssssss",newdisconnection)
   })

    this.socket.on('youare',(answer)=>{
      this.setState({id:answer.id})
    })
    this.socket.on('next',(message_from_server)=>console.log(message_from_server))
  

    /** this will be useful way, way later **/
    this.socket.on('room', old_messages => console.log(old_messages))
    this.socket.on('peeps', x => this.setState({peeps:x}))
    // console.log("peeps",x)


  }

  componentWillUnmount(){
    this.socket.close()
    this.socket = null
  }
  

  render() {
    return (
      
      <div className="App">
        <div>status: {this.state.isConnected ? 'connected' : 'disconnected'}</div>
                  
      <div>id: {this.state.id}</div>
      <button onClick={()=>this.socket.emit('ping!')}>ping</button>
      
      <button onClick={()=>this.socket.emit('whoami')}>Who am I?</button>
      <button onClick={()=>this.socket.emit('give me next')}>give me next</button>
            <button onClick={()=>this.socket.emit('ping!')}>ping</button>
            {this.state.peeps.map(listitem => {
    return (<ul><li>{listitem}</li></ul>)})}
      
          </div>
        );
      }
  
  
}

export default App;