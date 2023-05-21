import axios from 'axios';

export const url = 'http://localhost:5001';

class Request {
  signup(value) {
    return axios.post(`${url}/signup`, {...value}, {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    });
  };
  login(value) {
    return axios.post(`${url}/login`, {...value}, {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    });
  };

  createPost(value) {
    return axios.post(`${url}/create-post`, value, {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    });
  };
  getPosts() {
    return axios.get(`${url}/get-post`, {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    });
  };
  getDetail(postId) {
    return axios.get(`${url}/post-detail/${postId}`, {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    });
  };
  editPost(value, postId) {
    return axios.put(`${url}/edit-post/${postId}`, value, {
      validateStatus: function (status) {
        console.log(status);
        return status < 500; // Resolve only if the status code is less than 500
      }
    });
  };
  deletePost(value) {
    return axios.post(`${url}/delete-post`, {...value}, {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    });
  };
}

const request = new Request;
export default request;