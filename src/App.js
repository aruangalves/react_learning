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
      posts: []
    };

  }  

  handlePClick = () => {
    this.setState({ counter: this.state.counter+1});    
  }

  loadPosts = async () => {
    let postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    let photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    let [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    let postsJson = await posts.json();
    let photosJson = await photos.json();

    let postsAndPhotos = postsJson.map((post, index) =>{
      return {...post, cover: photosJson[index].url}
    });

    this.setState({ posts: postsAndPhotos});
    
  }


  componentDidMount(){
    this.loadPosts();
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
          <section className='container'>
            <div className='posts'>
              {posts.map(post => (
                <div key={post.id} className='post'>
                  <img src={post.cover} alt={post.title} />
                  <div className="post-content">
                    <h1>{post.title}</h1>                    
                    <p>{post.body}</p>
                  </div>
                </div>                
                )
              )}
            </div>
          </section>
          
          
        </header>
      </div>
    );
  };
}

export default App;
