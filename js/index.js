document.getElementById('github-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const searchInput = document.getElementById('search').value.trim();
    if (searchInput === '') {
      alert('Please enter a GitHub username to search.');
      return;
    }
  
    const apiUrl = `https://api.github.com/search/users?q=${encodeURIComponent(searchInput)}`;
    
    fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // For testing, log the API response data
      displayUsers(data.items); // Pass array of users to display function
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again later.');
    });
  });
  
  function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear previous results
    
    users.forEach(user => {
      const li = document.createElement('li');
      const username = document.createElement('h4');
      username.textContent = user.login;
  
      const avatar = document.createElement('img');
      avatar.src = user.avatar_url;
      avatar.alt = `${user.login} avatar`;
      avatar.style.width = '50px'; // Adjust size as needed
  
      const profileLink = document.createElement('a');
      profileLink.href = user.html_url;
      profileLink.textContent = 'Profile';
      profileLink.target = '_blank'; // Open link in new tab
  
      li.appendChild(username);
      li.appendChild(avatar);
      li.appendChild(profileLink);
  
      li.addEventListener('click', function() {
        fetchUserRepos(user.login);
      });
  
      userList.appendChild(li);
    });
  }
  
  function fetchUserRepos(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
  
    fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // For testing, log the API response data
      displayRepos(data); // Pass array of repositories to display function
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Error fetching repositories. Please try again later.');
    });
  }
  
  function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = ''; // Clear previous results
    
    repos.forEach(repo => {
      const li = document.createElement('li');
      const repoName = document.createElement('h4');
      repoName.textContent = repo.name;
  
      const repoLink = document.createElement('a');
      repoLink.href = repo.html_url;
      repoLink.textContent = 'Repository';
      repoLink.target = '_blank'; // Open link in new tab
  
      li.appendChild(repoName);
      li.appendChild(repoLink);
  
      reposList.appendChild(li);
    });
  }
  