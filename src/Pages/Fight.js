import React, { useEffect, useState} from "react";
import axios from "axios";

class PokeFilm extends React.Component(){
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    render(){
        return(
            <div>
                {this.props.data.map((val,key) =>{
                    <tr key={key}>
                        <td style={{"border":"1px solid"}}>{val.film_id}</td>
                        <td style={{"border":"1px solid"}}>{val.title}</td>
                        <td style={{"border":"1px solid"}}>{val.description}</td>
                    </tr>
                })}
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
            const {data} = await axios.get(`http://localhost:8080/Home/generateRandom`, {
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
    useEffect(()=>{
        handleClickRandom();
    },[])
    console.log(data);
    return(
        <div>
            {err && <h2>{err}</h2>}
            <button onClick={handleClickRandom}>Get A Random Film</button>
            {isLoading && <h2>Loading...</h2>}
            {data ? 
            <>
                <PokeFilm film={data}/>
            </>
            : <></>}
        </div>
    );
};

export default App;