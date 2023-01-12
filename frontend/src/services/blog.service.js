import axios from "axios";
import authHeader from "./auth-header";

class BlogService {
  getPost(id) {
    return axios.get(import.meta.env.VITE_API_BASE_URL + `/posts/${id}`);
  }

  getAllPosts() {
    return axios.get(import.meta.env.VITE_API_BASE_URL + `/posts`);
  }

  createPost(post) {
    return axios.post(import.meta.env.VITE_API_BASE_URL + "/posts", post, {
      headers: authHeader(),
    });
  }

  deletePost(postId) {
    return axios.delete(
      import.meta.env.VITE_API_BASE_URL + `/posts/${postId}`,
      {
        headers: authHeader(),
      }
    );
  }

  createComment(comment) {
    return axios.post(
      import.meta.env.VITE_API_BASE_URL + `/posts/${comment.postId}/comments`,
      comment,
      {
        headers: authHeader(),
      }
    );
  }

  getComment(postId, commentId) {
    return axios.get(
      import.meta.env.VITE_API_BASE_URL +
        `/posts/${postId}/comments/${commentId}`
    );
  }

  getPostComments(postId) {
    return axios.get(
      import.meta.env.VITE_API_BASE_URL + `/posts/${postId}/comments`
    );
  }

  getUserName(userId) {
    return axios.get(import.meta.env.VITE_API_BASE_URL + `/users/${userId}`);
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
