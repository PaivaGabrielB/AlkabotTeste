import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)
  const [userDetails, setUsersDetails] = useState([]);

  // Carrega os posts da API quando a página carrega
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  // Carrega os comentários associados ao post selecionado
  useEffect(() => {
    if (selectedPost) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}/comments`)
        .then(response => setComments(response.data))
        .catch(error => console.error(error));
    }
  }, [selectedPost]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      axios.get(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`)
        .then(response => setUsersDetails(response.data))
        .catch(error => console.error(error));
    }
  }, [selectedUser]);

  // Renderiza a lista de posts
  const renderPosts = () => {
    if (posts.length === 0) {
      return <p>Carregando posts...</p>;
    }

    return (
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <button onClick={() => setSelectedPost(post)}>
              {post.title}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  // Renderiza a lista de comentários
  const renderComments = () => {
    if (comments.length === 0) {
      return <p>Selecione um post para ver seus comentários.</p>;
    }

    return (
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.name}</strong> ({comment.email})<br />
            {comment.body}
          </li>
        ))}
      </ul>
    );
  };

  const renderUsers = () => {
    if (users.length === 0) {
      return <p>Carregando usuários...</p>;
    }

    return (
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <button onClick={() => setSelectedUser(user)}>
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const renderUsersDetails = () => {
    if (!userDetails) {
      return null;
      }

      return (
        <div>
          <h3>{userDetails.name}</h3>
          <p>E-mail: {userDetails.email}</p>
          <p>Telefone: {userDetails.phone}</p>
          <p>Website: {userDetails.website}</p>
        </div>
      );
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <div>
        <h2>Posts</h2>
        {renderPosts()}
  </div>
  <div>
    <h2>Comentários</h2>
    {renderComments()}
  </div>
      <div>
        <h2>Usuários</h2>
        {renderUsers()}
  </div>
  <div>
    <h2>Detalhes do Usuário</h2>
    {renderUsersDetails()}
  </div>
</div>


);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
//ReactDOM.render(<App />, document.getElementById('root'));



export default App;
