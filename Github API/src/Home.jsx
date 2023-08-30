import React, { useEffect, useState } from 'react'
import langColors from './langColors.json';

export default function Home({ inpValue, }) {
  const [pp, setPp] = useState('https://img.icons8.com/ios-glyphs/500/444444/github.png');
  const [login, setLogin] = useState('Username');
  const [name, setName] = useState('Name');
  const [bio, setBio] = useState('Bio');
  const [followers, setFollowers] = useState('0');
  const [following, setFollowing] = useState('0');
  const [repoName, setRepoName] = useState([]);
  const [langs, setLangs] = useState('lang');
  const [stars, setStars] = useState('1');
  const [colors, setColors] = useState('');

  const user = `https://api.github.com/users/${inpValue}`;
  const userRepos = `https://api.github.com/users/${inpValue}/repos`;
  const fetchData = async () => {
    try {
      const response = await fetch(user);
      const data = await response.json();
      const responseRepos = await fetch(userRepos);
      const dataRepos = await responseRepos.json();
      setPp(data.avatar_url);
      setLogin(data.login);
      setName(data.name);
      setBio(data.bio);
      setFollowers(data.followers)
      setFollowing(data.following)

      const names = dataRepos.map(repo => repo.name);
      setRepoName(names);
      const langs = dataRepos.map(repo => repo.language);
      setLangs(langs);
      const stars = dataRepos.map(repo => repo.stargazers_count);
      setStars(stars);

      const repoColors = langs.map(lang => langColors[lang] || '#555555');
      setColors(repoColors)

    } catch (error) {
      alert('Error fetching data: ' + error);
    }
  };
  useEffect(() => {
    if (inpValue.length > 1) {
      fetchData();
    }
  }, [inpValue]);

  return (
    <>
        <article id='home'>
            <aside>
                <img src={pp} alt="" />
                <p id='name'>{name}</p>
                <p id='username'>{login}</p>
                <p id='bio'>{bio}</p>
                <button id='follow'>Follow</button><p></p>
                <svg text="muted" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-people">
                    <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z" fill='#7C8490'></path>
                </svg>
                <span className='fol'><span>{followers}</span> followers <span>·</span> </span>
                <span className='fol'><span>{following}</span> following</span>
            </aside>
            <section id='rightS'>
              <div className='hr'>
                <p>Popular repositories</p>
                <span className='custom'>Customize your pins</span>
              </div>
              <section id='repos'>
                {repoName.map((name, index) => (            
                  <div className='repo' key={index}>
                    <p className='up'><span className='repoName'>{name}</span><span className='public'>Public</span></p>
                    <p className='down'>
                      <span><span className='color' style={{backgroundColor:colors[index]}}></span><span className='lang'>{langs[index]}</span></span>
                      <span>
                        <svg aria-label="stars" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-star">
                          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z" fill='#7C8490'></path>
                        </svg>
                        <span>{stars[index]}</span>
                      </span>      
                    </p>
                  </div>
                ))} 
              </section>
            </section>
        </article>
    </>
  )
}
