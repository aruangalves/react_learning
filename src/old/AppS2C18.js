import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component{

  constructor(props){
    super(props);    
    this.state = {
      name: 'Test case #',
      counter: 1,
      updates: 0,
      posts: [
        {
          id: 1,
          title: "Title for Post #1",
          body: "Full text for the first post"
        },
        {
          id: 2,
          title: "Title for Post #2",
          body: "Full text for the second post"
        },
        {
          id: 3,
          title: "Title for Post #3",
          body: "Full text for the third post"
        }
      ]
    };

  }

  timeoutUpdate = null;

  handlePClick = () => {
    this.setState({ counter: this.state.counter+1});    
  }

  handleTimeout = () =>{
    let {updates, posts} = this.state;
    posts[0].title = "Updated title for Post #1";
    this.timeoutUpdate = setTimeout(()=>{
      this.setState({
        updates: updates + 1,
        posts
      });
    },3000);
  }

  componentDidMount(){
    this.handleTimeout();
  }

  componentDidUpdate(){
    this.handleTimeout();   
  }

  componentWillUnmount(){
    clearTimeout(this.timeoutUpdate);    
  }

  render(){
    let { name, counter, updates, posts } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handlePClick}>
            Edit <code>src/App.js</code> and save to reload. {name}{counter}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>Amount of updated states: <b>{updates}</b></p>
          {posts.map(post => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
            )
          )}
        </header>
      </div>
    );
  };
}

export default App;
