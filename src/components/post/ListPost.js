import { useState, useEffect, useContext } from "react";
import request from "../../service";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/useContext";

const ListPosts = ({ onPosts, fetchPosts }) => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const handleViewPost = async(id) => {
    navigate('/post/view', {state: {id}});
  }

  const handleEditPost = async(id) => {
    const res = await request.getDetail(id);
    if(res.data.message === 'ok') {
      navigate('/post/edit', { state: { post: res.data.post, postId: id }});
    }
  }

  const handleDeletePost = async(id) => {
    const value = {
      postId: id,
      userId: user._id,
    }
    console.log(value);
    const res = await request.deletePost(value);
    if(res.data.message === 'ok') {
      await fetchPosts();
    }
  }

  return (
    <div className="list-post">
      {onPosts.length &&
        onPosts.map((item) => {
          const d = new Date(item.createdAt);
          let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
          let mo = new Intl.DateTimeFormat("en", { month: "numeric" }).format(d);
          let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
          const date = `${da}/${mo}/${ye}`;
          return (
            <div className="post-item" key={item._id}>
              <div className="date-post">Posted by on {date}</div>
              <h2>{item.title}</h2>
              <div className="action">
                <button onClick={handleViewPost.bind(null, item._id)}>VIEW</button>
                <button onClick={handleEditPost.bind(null, item._id)}>EDIT</button>
                <button onClick={handleDeletePost.bind(null, item._id)}>DELETE</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListPosts;
