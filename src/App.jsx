import { useState } from 'react'
import './App.css'
const API_URL = "https://api.github.com";

async function fetchResults(query){
  try{
    const response = await fetch(`${API_URL}/search/users?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch(e){
    throw new Error(e);
  }
}

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function onSearchChange(event){
    setQuery(event.target.value);
  }

  async function onSearchSubmit(event){
    event.preventDefault();
    const results = await fetchResults(query);
    setResults(results);
  }
  console.log(results);
  return (
    <div className="app">
    <main className="main">
    <h2>GitHub User Search</h2>
    <Form onChange={onSearchChange} onSubmit={onSearchSubmit}/>
    <h3>Results</h3>
    <div id="results">
      <div>
        {results.map((user)=>(
          <User
             key={user.login}
             avatar={user.avatar_url}
             url={user.html_url}
             username={user.login}
          />
        ))}
      </div>
    </div>
    </main>
     
    </div>
  )
}

function User({avatar, url, username}){
  return(
    <div className='user'>
      <img src={avatar} alt="" width="50" height="50"/>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
      </a>
    </div>
  )
}

function Form({onSubmit, onChange, value}){
  return(
    <form className='search-form' onSubmit={onSubmit}>
        <input 
          id="search"
          type="text"
          placeholder='enter'
          onChange={onChange}
          value={value}
        />
        <button type="submit">Search</button>
    </form>
  )
}


export default App
