import React, { useEffect, useRef, useState} from "react";
import axios from "axios";



class PokeFilm extends React.Component{
    constructor(props){
        super(props)
        this.myRef = React.createRef();
        
    }
    render(){
        const health = this.props.film.length;
        const name = this.props.film.title;
        
        return(
            <tr>
                <td class="film_id_loaded" style={{"border":"1px solid"}}>{this.props.film.film_id}</td>
                <td style={{"border":"1px solid"}}>{name}</td>
                <td style={{"border":"1px solid"}}>{health}</td>
                <td style={{"border":"1px solid"}}>{this.props.film.description}</td>  
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
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

class Poke extends React.Component{
    render(){
        return(
            <div class="page-loaded">
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

    const idInput = useRef(null);
    const titleInput = useRef(null);
    const handleUpdate = () =>{
        fetch(`http://localhost:8080/Home/Film/update`,{
            method: 'POST',
            body: JSON.stringify({
                film_id: idInput.current.value,
                title: titleInput.current.value
            }),
            headers: {'Content-Type' : 'application/json'}
        })
    }

    useEffect(()=>{
        handleClickRandom();
    },[])
    return(
        <div>
            {err && <h2>{err}</h2>}
            <button onClick={handleClickRandom}>Get A Random List Film</button>
            <input type="text" ref={idInput}></input>
            <input type="text" ref={titleInput}></input>
            <button onClick={handleUpdate}>Update</button>
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