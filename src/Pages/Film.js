import React, {useEffect, useState} from "react";

function Fetchdata(){
    const [data, setData] = useState(null);
    let id = Math.floor(Math.random() * (1000 - 1 + 1) + 1)
    useEffect(() => {
        fetch(`http://localhost:8080/Home/GetPokeFilm/${id}`, {method: `GET`})
            .then((res) => res.json())
            .then((filmData) => {
                setData({
                    film_id : filmData.film_id,
                    title : filmData.title,
                    description : filmData.description,
                });
    
            });
    });
    return data;
}

class Film extends React.Component{
    render(){
        const film = this.props.filmdata;
        return(
            <div>
                <h1>Film</h1>
                {film ? (
                <h2>{film.film_id}</h2>
                ): <></>}
                {film ? (
                <h2>{film.title}</h2>
                ): <></>}
                {film ? (
                <h2>{film.description}</h2>
                ): <></>}
            </div>
        );
    }
}

function App(){
    return(
        <Film filmdata={Fetchdata()}/>
    )
}

export default App;