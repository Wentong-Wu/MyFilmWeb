import React, { useEffect, useState} from "react";
import axios from "axios";

class PokeFilm extends React.Component{
    constructor(props){
        super(props)
        this.myRef = React.createRef();
    }
    render(){
        const health = this.props.film.length;
        const name = this.props.film.title;
        let id = this.props.film.film_id;
        const handleUpdate = () =>{
            fetch(`http://localhost:8080/Home/Film/update`,{
                method: 'POST',
                body: JSON.stringify({
                    film_id: id,
                    title: this.myRef.current.value
                }),
                headers: {'Content-Type' : 'application/json'}
                
            })
            .then((response) => response.json())
            .then((data) =>{
                console.log(data)
            })
        }
        return(
            <tr>
                <td style={{"border":"1px solid"}}>{this.props.film.film_id}</td>
                <td style={{"border":"1px solid"}}>{name}</td>
                <td style={{"border":"1px solid"}}>{health}</td>
                <td style={{"border":"1px solid"}}>{this.props.film.description}</td>
                <td style={{"border":"1px solid"}}>
                    <input type="text" ref={this.myRef}></input>
                </td>
                <td style={{"border":"1px solid"}}>
                    <button onClick={handleUpdate}>Update</button>
                </td>
            </tr>
        )
    }
}

class PokeTable extends React.Component{
    render(){
        const rows=[];
        this.props.film.forEach((films) =>{
            rows.push(
                <PokeFilm film={films} key={films.film_id} />
            )
        })
        const tablestyle = {
            "border": "1px solid"
        };
        return(
            <table style={tablestyle}>
                <thead style={tablestyle}>
                    <tr>
                        <th style={tablestyle}>ID</th>
                        <th style={tablestyle}>Name</th>
                        <th style={tablestyle}>Health</th>
                        <th style={tablestyle}>Description</th>
                        <th style={tablestyle}>Name To Change</th>
                        <th style={tablestyle}>Update</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

class Poke extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(
            <div>
                <PokeTable 
                    film={this.props.film}
                />
            </div>
        )
    }
}

const App = () => {
    const [data, setData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClickRandom = async () => {
        setIsLoading(true);
        try{
            const {data} = await axios.get(`https://sakilaapp-1663062389506.azurewebsites.net/Home/generateRandom`, {
                headers: {
                    Accept: 'application/json',
                },
            });
            console.log('data is: ', JSON.stringify(data, null, 4));
            setData(data);
        }catch(err){
            setErr(err.message);
        }finally{
            setIsLoading(false);
        }
    };
    
    console.log(data);
    return(
        <div>
            {err && <h2>{err}</h2>}
            <button onClick={handleClickRandom}>Get A Random Film</button>

            {isLoading && <h2>Loading...</h2>}
            {data ? 
            <>
                <Poke film={data}/>
            </>
            : <></>}
        </div>
    );
};

export default App;