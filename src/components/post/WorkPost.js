import { useContext, useEffect, useState } from "react";
import request from "../../service";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../store/useContext";

const WorkPost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { params } = useParams();

  useEffect(() => {
    if (params === "edit") {
      // const base64 = Buffer.from(location.state.post.image).toString("base64");

      setTitle(location.state.post.title);
      setImage(location.state.post.image);
      setContent(location.state.post.description);
    }
  }, [params]);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
    let objectUrl = URL.createObjectURL(file);
    setImgUrl(objectUrl);
  };
  
  // console.log(file);
  const handleSubmit = async () => {
    setErrMessage("");
    if (params === "edit") {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", content);
      formData.append("image", image);
      formData.append("userId", user._id);
      const postId = location.state.postId;
      // const config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // };
      const res = await request.editPost(formData, postId);

      if (res.data.message !== "ok") {
        setErrMessage("Value invalid");
      } else {
        navigate("/");
      }
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", content);
      formData.append("image", image);
      formData.append("author", user._id);
      const res = await request.createPost(formData);
      if (res.data.message !== "ok") {
        setErrMessage("Value invalid");
      } else {
        navigate("/");
      }
    }
  };

  const handleCancel = () => {
    navigate("/");
  }

  return (
    <>
      <div className="space"></div>
      <div className="post">
        <div className="header">{params === 'edit' ? 'Edit' : 'New'} Post</div>
        <hr></hr>
        <div className="content">
          <div className="form-control">
            <label>TITLE</label>
            <input
              type="text"
              value={title}
              name="title"
              onChange={handleChangeTitle}
            />
          </div>
          <div className="form-control">
            <label>IMAGE</label>
            <div className="input-file">
              <input type="file" name="image" onChange={handleFile} />
            </div>
            {!imgUrl && <span>Please choose an photo!</span>}
            <div className="content-image">
              <img
                src={imgUrl}
              />
            </div>
          </div>
          <div className="form-control">
            <label>CONTENT</label>
            <textarea
              value={content}
              type="text"
              rows={4}
              name="image"
              onChange={handleChangeContent}
            />
          </div>
        </div>
        <div className="footer">
          <div className="message-error">{errMessage}</div>
          <button onClick={handleCancel}>CANCEL</button>
          <button type="submit" onClick={handleSubmit}>
            ACCEPT
          </button>
        </div>
      </div>
    </>
  );
};

export default WorkPost;
