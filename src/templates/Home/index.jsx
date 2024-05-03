import logo from './logo.svg';
import './styles.css';

import { Component } from 'react';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../actions/load-posts';
import { Button } from '../../components/Button';

class Home extends Component{

  constructor(props){
    super(props);    
    this.state = {
      name: 'Test case #',
      counter: 1,
      updates: 0,
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 12,
      disableButton: true
    };

  }  

  handlePClick = () => {
    this.setState({ counter: this.state.counter+1});    
  }

  loadPosts = async () => {
    let { page, postsPerPage } = this.state;
    let postsAndPhotos = await loadPosts();
    let denyMorePosts = true;

    if((page + postsPerPage) < postsAndPhotos.length){
      denyMorePosts = false;
    }

    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
      disableButton: denyMorePosts
    });
    
  }

  loadMorePosts = () =>{
    const{
      page, postsPerPage, posts, allPosts, disableButton
    } = this.state;    
    let nextPage = page + postsPerPage;
    let nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    let denyMorePosts = false;
    if(nextPage + postsPerPage > allPosts.length){
      denyMorePosts = true;
    }
    this.setState({posts, page: nextPage, disableButton: denyMorePosts});    
  }

  async componentDidMount(){
    await this.loadPosts();
  }

  render(){
    let { name, counter, updates, posts, disableButton } = this.state;

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
            <Posts posts={posts} />
            <Button disabled={disableButton} onClick={this.loadMorePosts} text="Load more posts" />            
          </section>
          
          
        </header>
      </div>
    );
  };
}

export default Home;
