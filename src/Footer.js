import React from "react";
import "./Footer.css";

export default function(props) {
  return (
    <section className={`footer ${props.className}`}>
      © Copyright 2019-2020 www.LeagueSearch.GG. All rights reserved.
      LeagueSearch.GG isn't endorsed by Riot Games and doesn't reflect the views
      or opinions of Riot Games or anyone officially involved in producing or
      managing League of Legends. League of Legends and Riot Games are
      trademarks or registered trademarks of Riot Games, Inc. League of Legends
      © Riot Games.
    </section>
  );
}
