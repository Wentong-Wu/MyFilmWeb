import React from "react";

function showallfilm()
{
    let filmDiv = document.getElementById('filmTable')
    fetch('http://localhost:8080/Home/RandomEnemyPokeFilm', {method: `GET`})
    .then(res => res.json())
    .then(films=>
        {
            alert(films);
        })
}

function Home(){
    return(
        <div>
            <h1>
                Home
            </h1>
            <button onClick={showallfilm}>CLICK ME</button>
        </div>
    )
}

export default Home;