import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "https://my-awesome-blog-backend.ew.r.appspot.com/api/";
const API_URL = "http://localhost:8080/api/";

class BlogService {
  getPost(id) {
    return axios.get(API_URL + `posts/${id}`);
  }

  getAllPosts() {
    return axios.get(API_URL + `posts`);
  }

  createPost(post) {
    return axios.post(API_URL + "posts", post, { headers: authHeader() });
  }

  deletePost(postId) {
    return axios.delete(API_URL + `posts/${postId}`, { headers: authHeader() });
  }

  createComment(comment) {
    return axios.post(API_URL + `posts/${comment.postId}/comments`, comment, {
      headers: authHeader(),
    });
  }

  getComment(commentId) {
    return axios.get(API_URL + `posts/${comment.postId}/comments/${commentId}`);
  }

  getPostComments(postId) {
    return axios.get(API_URL + `posts/${postId}/comments`);
  }

  getUserName(userId) {
    return axios.get(API_URL + `users/${userId}`);
  }

  formatDate(dateString) {
    const date = new Date(dateString);

    return (
      date.toLocaleString("default", { month: "long" }) +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear()
    );
  }
}

export default new BlogService();
