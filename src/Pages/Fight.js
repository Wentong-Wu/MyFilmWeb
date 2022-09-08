import React, { useState} from "react";
import axios from "axios";

const App = () => {
    const [data, setData] = useState({data:[]});
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClickRandom = async () => {
        setIsLoading(true);
        let id = Math.floor(Math.random() * (1000 - 1 + 1) + 1)
        try{
            const {data} = await axios.get(`http://localhost:8080/Home/GetPokeFilm/${id}`, {
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
            <tr>
                <td>{data.film_id}</td>
                <td>{data.title}</td>
                <td>{data.description}</td>
            </tr>
        </div>
    );
};

export default App;