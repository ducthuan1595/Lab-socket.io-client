import { useEffect, useMemo, useState } from "react";
import request from "../service";
import { useLocation } from "react-router-dom";
import Navigation from "../components/Navigation";
import { Buffer } from 'buffer';

const DetailPost = () => {
  const location = useLocation();

  const [post, setPost] = useState(null);
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchDetailPost = async () => {
      const res = await request.getDetail(location.state.id);
      if (res.data.message !== "ok") {
        return;
      }
      console.log(res.data.post);
      setPost(res.data.post);
    };
    fetchDetailPost();
  }, []);

  useEffect(() => {
    if(post) {
      const d = new Date(post.createdAt);
      let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      let mo = new Intl.DateTimeFormat("en", { month: "numeric" }).format(d);
      let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
      const date = `${da}/${mo}/${ye}`;
      setDate(date);
      const base64 = Buffer.from(post.image).toString('base64');
      setImageUrl(base64)
    }
  }, [post]);
  return (
    <>
      <Navigation />
      {!post && <div style={{fontSize: '20px', textAlign: 'center', marginTop: '100px'}}>Loading...</div>}
      <div className="view-detail">
        <h1>{post?.title}</h1>
        <p>Created by on {date}</p>
        <hr></hr>
        <img src={'data:image/jpeg;base64,' + imageUrl} alt={post?.title} />
        <div>{post?.description}</div>
      </div>
    </>
  );
};

export default DetailPost;
