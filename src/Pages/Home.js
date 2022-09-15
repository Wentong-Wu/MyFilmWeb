import React, { useEffect, useState} from "react";
import axios from "axios";

const App = () => {
    const [data, setData] = useState({data:[]});
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [hangman, setHangman] = useState('')
    const [playable, setPlayble] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);

    function displayWord(hangman,correctLetters){
        return(
            <div>
                {hangman.split('').map((letter, i) =>{
                    return(
                        <span key={i}>
                            {correctLetters.includes(letter) ? letter:' _ '}
                        </span>
                    )
                })}
            </div>
        )
    }
    const handleClickRandom = async () => {
        setCorrectLetters([])

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
        }catch(err){
            setErr(err.message);
        }finally{
            setIsLoading(false);
        }
    };
    const handleKeyDown = event => {
        const{key, keyCode} = event;
        if(playable && keyCode >= 65 && keyCode <= 90){
            const letter = key.toUpperCase();
            if(hangman.includes(letter)){
                if(!correctLetters.includes(letter)){
                    //Spread the letters inside CorrectLetter and add the letter into it
                    setCorrectLetters(currentLetters => [...currentLetters, letter]);
                }
            }
            else{
                if(!wrongLetters.includes(letter)){
                    setWrongLetters(wrongLetter => [...wrongLetter, letter]);
                }
            }
        }
        if(!playable){
            return(
                <button>PlayAgain!</button>
            )
        }
    }
    useEffect(()=>{
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    },[correctLetters,wrongLetters,playable])
    return(
        <div>
            {err && <h2>{err}</h2>}
            <button onClick={handleClickRandom}>Play</button>
            {isLoading && <h2>Loading...</h2>}
            <div class="page-loaded">
                <h1>{displayWord(hangman,correctLetters)}</h1>                
            </div>
        </div>
    );
};

export default App;