const getFixtures =  () => {
  fetch("https://api-football-v1.p.rapidapi.com/v2/predictions/157462", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
		"x-rapidapi-key": "59157d8f8dmsh61400b13fd3d5f2p1e9c25jsnbc16a3a49c64"
	}
})
.then(response => response.json())
.then(response => console.log(response))
.catch(err => {
	console.log(err);
});
}


const getFixturesPlaying = () => {
  fetch("https://api-football-v1.p.rapidapi.com/v2/fixtures/live", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
		"x-rapidapi-key": "59157d8f8dmsh61400b13fd3d5f2p1e9c25jsnbc16a3a49c64"
	}
})
.then(response => response.json())
.then(response => {
  
  console.log(response);

  let result_container = document.querySelector('#latest_results');

  for (let index = 0; index < 4; index++) {

      const element = response.api.fixtures[index];
      
      const homeTeam = element.homeTeam;
      const awayTeam = element.awayTeam;

      const goalsHomeTeam = element.goalsHomeTeam;
      const goalsAwayTeam = element.goalsAwayTeam;
      
      
 let s = `<article class="game-result game-result-modern">
                      <div class="game-result-main">
                      <div class="game-result-team game-result-team-first game-result-team-win">
                        <div class="game-result-team-name">${homeTeam.team_name}</div>
                        
                      </div>
                      
                      <div class="game-result-score-wrap">
                        <div class="game-result-score">${goalsHomeTeam}</div>
                        <div class="game-result-score-divider">
                          <svg x="0px" y="0px" width="7px" height="21px" viewBox="0 0 7 21" enable-background="new 0 0 7 21" xml:space="preserve">
                            <g>
                              <circle cx="3.5" cy="3.5" r="3"></circle>
                              <path d="M3.5,1C4.879,1,6,2.122,6,3.5S4.879,6,3.5,6S1,4.878,1,3.5S2.122,1,3.5,1 M3.5,0C1.567,0,0,1.567,0,3.5S1.567,7,3.5,7      S7,5.433,7,3.5S5.433,0,3.5,0L3.5,0z"></path>
                            </g>
                            <g>
                              <circle cx="3.695" cy="17.5" r="3"></circle>
                              <path d="M3.695,15c1.378,0,2.5,1.122,2.5,2.5S5.073,20,3.695,20s-2.5-1.122-2.5-2.5S2.316,15,3.695,15 M3.695,14      c-1.933,0-3.5,1.567-3.5,3.5s1.567,3.5,3.5,3.5s3.5-1.567,3.5-3.5S5.628,14,3.695,14L3.695,14z"></path>
                            </g>
                          </svg>
                        </div>
                        <div class="game-result-score">${goalsAwayTeam}</div>
                      </div>
                      <div class="game-result-team game-result-team-second">
                        <div class="game-result-team-name">${awayTeam.team_name}</div>
                      </div>
                    </div>
                  </article>`;

result_container.innerHTML += s;
      
    }
   console.log(result_container); 
})
.catch(err => {
	console.log(err);
});

}
window.addEventListener('load',(e) => {  
  getFixturesPlaying();
})