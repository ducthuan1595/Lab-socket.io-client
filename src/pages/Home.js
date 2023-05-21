import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import ListPosts from "../components/post/ListPost";
import request from "../service";
import { socket } from "../socket";

const HomePage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const handleAddPost = () => {
    navigate('/post/create-post');
  };
  
  const fetchPosts = async() => {
    const res = await request.getPosts();
    if(res.data.message !== 'ok') {
      return ;
    }
    console.log(res.data.posts);
    setPosts(res.data.posts);
  }
  useEffect(() => {
    fetchPosts();
  } ,[])

  useEffect(() => {
    const updatePosts = [...posts];
    socket.on('posts', data => {
      if(data.action === 'create') {
        updatePosts.unshift(data.post);
        setPosts(updatePosts);
      }
      if(data.action === 'edit') {
        const updateIndex = updatePosts.findIndex(p => p._id === data.post._id);
        if(updateIndex > -1) {
          updatePosts[updateIndex] = data.post;
        }
        setPosts(updatePosts);
      }
    });
  }, [posts])

  return (
    <>
      <Navigation />
      <div className='home'>
        <div className='title'>
          <span>I am new!</span>
          <div>UPDATE</div>
        </div>
        <button onClick={handleAddPost} className='btn-add'>NEW POST</button>
        {posts?.length === 0 && <div className='not-found'>No posts found</div>}
        <ListPosts onPosts={posts} fetchPosts={fetchPosts} />
      </div>
    </>
  )
}

export default HomePage;