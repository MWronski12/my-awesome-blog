import axios from "axios";
import authHeader from "./auth-header";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class BlogService {
  getPost(id) {
    return axios.get(API_BASE_URL + `/api/posts/${id}`);
  }

  getAllPosts() {
    return axios.get(API_BASE_URL + `/api/posts`);
  }

  createPost(post) {
    return axios.post(API_BASE_URL + "/api/posts", post, {
      headers: authHeader(),
    });
  }

  deletePost(postId) {
    return axios.delete(API_BASE_URL + `/api/posts/${postId}`, {
      headers: authHeader(),
    });
  }

  createComment(comment) {
    return axios.post(
      API_BASE_URL + `/api/posts/${comment.postId}/comments`,
      comment,
      {
        headers: authHeader(),
      }
    );
  }

  getComment(postId, commentId) {
    return axios.get(
      API_BASE_URL + `/api/posts/${postId}/comments/${commentId}`
    );
  }

  getPostComments(postId) {
    return axios.get(API_BASE_URL + `/api/posts/${postId}/comments`);
  }

  deleteComment(postId, commentId) {
    return axios.delete(
      API_BASE_URL + `/api/posts/${postId}/comments/${commentId}`,
      { headers: authHeader() }
    );
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
