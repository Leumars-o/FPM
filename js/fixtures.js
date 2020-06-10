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

const getFixtureFromId = (id) => {
  fetch(`https://api-football-v1.p.rapidapi.com/v2/fixtures/id/${id}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
		"x-rapidapi-key": "59157d8f8dmsh61400b13fd3d5f2p1e9c25jsnbc16a3a49c64"
	}
})
.then(response => response.json())
.then(({api:{ fixtures }}) => {
  console.log(fixtures)

  const { league:{ name: leagueName }, event_date, homeTeam: {team_name: homeTeamName ,logo: homeTeamLogo}, awayTeam:{team_name: awayTeamName, logo: awayTeamLogo} } = fixtures[0];

  const container = document.querySelector('#game_result_fixures');

  const fixture_string =  `
  
              <article class="game-result">
                <div class="game-info">
                  <!--Competition title-->
                  <p class="game-info-subtitle">${leagueName.toUpperCase()} - 
                    <time datetime="08:30"> 08:30 PM</time>
                  </p>
                  <!--<h3 class="game-info-title">English Premier League</h3>-->
                  <div class="game-info-main">
                    <!--Team 1 info-->
                    <div class="game-info-team game-info-team-first">
                      <figure><img src=${homeTeamLogo} alt=${homeTeamName} width="75" height="99"/>
                      </figure>
                      <div class="game-result-team-name">${homeTeamName.toUpperCase()}</div>
                    </div>
                    <div class="game-info-middle game-info-middle-vertical">
                      <time class="time-big" datetime="2019-04-17"><span class="heading-3">Fri 19</span> May 2019
                      </time>
                      <div class="game-result-divider-wrap"><span class="game-info-team-divider">VS</span></div>
                      <div class="group-sm">
                        <div class="button button-sm button-share-outline">Ov 2.5
                          <ul class="game-info-share">
                            <li class="game-info-share-item"><a class="icon fa fa-facebook" href="index.html#"></a></li>
                            <li class="game-info-share-item"><a class="icon fa fa-twitter" href="index.html#"></a></li>
                            <li class="game-info-share-item"><a class="icon fa fa-google-plus" href="index.html#"></a></li>
                            <li class="game-info-share-item"><a class="icon fa fa-instagram" href="index.html#"></a></li>
                          </ul>
                        </div>
                        <button type="button" class="button button-sm button-primary" data-toggle="collapse" data-target="#demo-1">Stats & Chat</button>
                      </div>
                    </div>
                    <!--Team 2 info-->
                    <div class="game-info-team game-info-team-second">
                      <figure><img src=${awayTeamLogo} alt=${awayTeamName} width="78" height="98"/>
                      </figure>
                      <div class="game-result-team-name">${awayTeamName.toUpperCase()}</div>
                    </div>
                    
                  </div>
                  <!--collapsible content-->
                  <div id="demo-1" class="collapse hide">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><br />
                        <ul class="nav nav-tabs">
                          <li class="nav-item">
                              <a href="#chat-1" class="nav-link active" role="tab" data-toggle="tab">chat</a>
                          </li>
                  
                          <li class="nav-item">
                              <a href="#stat-1" class="nav-link" role="tab" data-toggle="tab">stats</a>
                          </li>
                          <li>
                            <a href="#other-outcomes" class="nav-link" role="tab" data-toggle="tab">possible outcomes</a>
                          </li>
                        </ul>
                    
                        <div class="tab-content">
                          <div role="tabpanel" class="tab-pane fade in active show" id="chat-1">
                            <div class="row bootstrap snippets">
                              <div class="col-md-6 col-md-offset-2 col-sm-12 col-lg-12">
                                <div class="comment-wrapper">
                                  <div class="panel panel-info">
                                      <div class="panel-heading">
                                        <br>
                                          Comment panel
                                        <br>  
                                      </div>
                                      <div class="panel-body">
                                          
                                        <div class="clearfix"></div>
                                        <hr>
                                        <ul class="media-list">
                                            <li class="media">
                                              <div  class="pull-left">
                                                <img src="https://bootdey.com/img/Content/user_1.jpg" alt="" class="img-circle">
                                              </div>
                                              <div class="media-body">
                                                <span class="text-muted pull-right">
                                                  <small class="text-muted">30 min ago</small>
                                                </span>
                                                <strong class="text-success">@MartinoMont</strong>
                                                <p>
                                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                  Lorem ipsum dolor sit amet </a>.
                                                </p>
                                              </div>
                                            </li>
                                            <li class="media">
                                              <div  class="pull-left">
                                                <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" class="img-circle">
                                              </div>
                                              <div class="media-body">
                                                <span class="text-muted pull-right">
                                                  <small class="text-muted">30 min ago</small>
                                                </span>
                                                <strong class="text-success">@LaurenceCorreil</strong>
                                                <p>
                                                  Lorem ipsum dolor sit amet,<br> consectetur adipiscing elit.<br>
                                                  Lorem ipsum dolor adipiscing elit.
                                                </p>
                                              </div>
                                            </li>
                                            <li class="media">
                                              <div  class="pull-left">
                                                <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" class="img-circle">
                                              </div>
                                              <div class="media-body">
                                                  <span class="text-muted pull-right">
                                                    <small class="text-muted">30 min ago</small>
                                                  </span>
                                                  <strong class="text-success">@JohnNida</strong>
                                                  <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                  </p>
                                              </div>
                                            </li>
                                        </ul>
                                        <hr>
                                        <div class="clearfix-1"></div>
                                        <form>
                                          <textarea class="form-control" placeholder="write a comment..." rows="3" maxlength="140"></textarea>
                                          <br>
                                          <input type="submit" class="btn btn-info pull-right" value="send"></input>
                                        </form>
                                      </div>
                                  </div>
                                </div>
                          
                              </div>
                            </div>
                      
                          </div>
                          <div role="tabpanel" class="tab-pane fade" id="other-outcomes">
                            <div class="table-game-info-title">other possible outcomes</div>
                            <div class="table-game-info-main table-custom-responsive">
                                <table class="table-custom table-game-info">
                                  <tbody>
                                    <tr>
                                      <td class="table-game-info-category-1">ov 8.5 corners</td>
                                      
                                    </tr>
                                  </tbody>
                                </table>
                                
                                <table class="table-custom table-game-info">
                                  <tr>
                                    <td class="table-game-info-category-1">X- Half time</td>
                                  </tr>
                                </table>
                                <table class="table-custom table-game-info">
                                    <tr>
                                      <td class="table-game-info-category-1">Home win either half</td>
                                    </tr>
                                  </table>
                            </div>
                          </div>
                          <div role="tabpanel" class="tab-pane fade" id="stat-1">
                              <div class="table-game-info-wrap"><span class="table-game-info-wrap"><br>Game statistics<span></span></span>
                                <div class="table-game-info-main table-custom-responsive">
                                  <table class="table-custom table-game-info">
                                    <tbody>
                                      <tr>
                                        <td class="table-game-info-number">1</td>
                                        <td class="table-game-info-category">League position</td>
                                        <td class="table-game-info-number">10</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  
                                  <table class="table-custom table-game-info table-game-color">
                                    <tr>
                                      <td>
                                        <table>
                                          <tr>
                                            <td class="w-d-l won"><span>W</span></td>
                                            <td class="w-d-l draw"><span>D</span></td>
                                            <td class="w-d-l draw"><span>D</span></td>
                                            <td class="w-d-l won"><span>W</span></td>
                                            <td class="w-d-l lost"><span>L</span></td>
                                          </tr>
                                        </table>
                                      </td>
                                      <td class="table-game-info-category-1">previous games</td>
                                      <td>
                                        <table>
                                          <tr>
                                            <td class="w-d-l won"><span>W</span></td>
                                            <td class="w-d-l draw"><span>D</span></td>
                                            <td class="w-d-l draw"><span>D</span></td>
                                            <td class="w-d-l won"><span>W</span></td>
                                            <td class="w-d-l lost"><span>L</span></td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>  
                                  
                                  
                                </div>
                              </div>
                            <button type="button" class="btn btn-info btn-sm btn-primary" data-toggle="modal" data-target="#myModal-1">view more</button>
                            <div id="myModal-1" class="modal fade" role="dialog">
                              <div class="modal-dialog ">
                              
                                <!-- Modal content-->
                                <div class="modal-content">
                                <div class="modal-header">
                                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                                  <h4 class="modal-title"><br>Statistics</h4>
                                </div>
                                <div class="modal-body">
                                  <p>Some text in the modal.</p>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-default btn-sm btn-primary" data-dismiss="modal">Close</button>
                                </div>
                                </div>
                              
                              </div>
                            </div>
                                
                            </div>
                        </div>
                      </div> 
                    </div>
                  </div>
                  <!--end of collapsible-->
                </div>
              </article>
  `;
  container.innerHTML = fixture_string;

})
.catch(err => {
	console.log(err);
});
}
window.addEventListener('load',(e) => {  
  getFixturesPlaying();
  getFixtureFromId(68);
})