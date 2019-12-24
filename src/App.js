import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import TimeAgo from "./hooks/epochToTime.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      icon: null,
      name: "",
      level: null,
      matches: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit() {
    event.preventDefault();

    axios
      .post("/summonerSearch", { username: this.state.username })
      .then(response => {
        console.log("/summonerSearch", response.data);
        this.setState({
          icon: response.data.profileIconId,
          level: response.data.summonerLevel,
          name: response.data.name,
          accountId: response.data.accountId,
          summonerId: response.data.id
        });

        // const getLeagues = axios.get(
        //   `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${process.env.API_KEY}`
        // );

        // axios
        //   .all([getMatchHistory, getLeagues])
        //   .then(
        //     axios.spread((...responses) => {
        //       const responseOne = responses[0].data;
        //       const responseTwo = responses[1];

        //       console.log(responseOne);
        //       res.send([responseOne, responseTwo]);
        //     })
        //   )
        //   .catch(errors => {
        //     console.log(errors);
        //     // react on errors.
        //   });

        const getMatchHistory = axios.post("/matchHistory", {
          accountId: this.state.accountId,
          summonerId: this.state.summonerId
        });
        const getLeagues = axios.post("/leagues", {
          accountId: this.state.accountId,
          summonerId: this.state.summonerId
        });
        return axios.all([getMatchHistory, getLeagues]);
      })
      .then(
        axios.spread((...responses) => {
          const responseMatches = responses[0].data;
          const responseLeagues = responses[1];

          console.log(responseLeagues);
          const matches = [];
          responseMatches.matches.forEach((element, index) => {
            let timeSince = new Date(element.timestamp);

            matches.push(
              <article key={index}>
                {element.lane}
                {element.champion}
                <TimeAgo time={timeSince} />
              </article>
            );
          });
          this.setState({ matches });
        })
      )

      // (response => {
      //   console.log("/matchHistory", response.data);
      //   const matches = [];
      //   response.data.matches.forEach((element, index) => {
      //     let timeSince = new Date(element.timestamp);

      //     matches.push(
      //       <article key={index}>
      //         {element.lane}
      //         {element.champion}
      //         <TimeAgo time={timeSince} />
      //       </article>
      //     );
      //   });
      //   this.setState({ matches });
      // })
      .catch(function(error) {
        console.log(error);
      });
  }
  loadIcon(profileiconid) {
    return (
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/6.3.1/img/profileicon/${profileiconid}.png`}
        alt="new"
      />
    );
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter username"
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={this.handleSubmit.bind(this)}
          >
            Submit
          </Button>
          <section>
            {this.state.name ? this.loadIcon(this.state.icon) : null}
          </section>
          {this.state.name} {this.state.level} <div>{this.state.matches}</div>
        </Form>
      </div>
    );
  }
}

export default App;
