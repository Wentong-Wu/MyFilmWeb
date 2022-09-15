import React, { useEffect, useState} from "react";
import axios from "axios";

const App = () => {
    const [data, setData] = useState({data:[]});
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [hangman, setHangman] = useState('')
    const [gameDisplay, setGameDisplay] = useState('')

    const handleClickRandom = async () => {
        setIsLoading(true);
        let id = Math.floor(Math.random() * (1000 - 1 + 1) + 1)
        try{
            const {data} = await axios.get(`https://sakilaapp-1663062389506.azurewebsites.net/Home/ChooseFilm/${id}`, {
                headers: {
                    Accept: 'application/json',
                },
            });
            console.log('data is: ', JSON.stringify(data, null, 4));
            setData(data);
            setHangman(data.title)
            setGameDisplay("_ ".repeat(data.title.length))
        }catch(err){
            setErr(err.message);
        }finally{
            setIsLoading(false);
        }
    };
    useEffect(()=>{
        handleClickRandom();
    },[])
    const tablestyle = {
        "border": "1px solid"
    };
    return(
        <div>
            {err && <h2>{err}</h2>}
            <button onClick={handleClickRandom}>Get A Random Film</button>
            {isLoading && <h2>Loading...</h2>}
            <div class="page-loaded">
                <table style={tablestyle}>
                    <thead style={tablestyle}>
                        <tr>
                            <th style={tablestyle}>ID</th>
                            <th style={tablestyle}>Title</th>
                            <th style={tablestyle}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="film_id_loaded" style={tablestyle}>{data.film_id}</td>
                            <td style={tablestyle}>{data.title}</td>
                            <td style={tablestyle}>{data.description}</td>
                        </tr>
                    </tbody>
                </table>
                <h1>{gameDisplay}</h1>
            </div>
        </div>
    );
};

export default App;