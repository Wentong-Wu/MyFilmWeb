import React, {useEffect, useState} from "react";
import axios from "axios";

class FilmRow extends React.Component{
    render(){
        return(
            <tr>
                <td>{this.props.film.title}</td>
            </tr>
        )
    }
}

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    handleFilterTextChange(e){
        this.props.onFilterTextChange(e.target.value);
    }
    render(){
        return(
            <form>
                <input 
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
            </form>
        );
    }
}

class FilmTable extends React.Component{
    render(){
        const filterText = this.props.filterText;
        const rows=[];
        this.props.film.forEach((films) => {
            if(films.title.indexOf(filterText) === -1){
                return;
            }
            rows.push(
                <FilmRow 
                    film={films}
                    key={films.title}
                />
            )
        })
        return(
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

class Film extends React.Component{
    constructor(props){
        super(props)
        this.state={
            filterText:''
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    handleFilterTextChange(filterText){
        this.setState({
            filterText:filterText
        })
    }
    render(){
        return(
            <div>
                <SearchBar 
                    filterText={this.state.filterText}
                    onFilterTextChange={this.handleFilterTextChange}
                />
                <FilmTable 
                    film={this.props.film}
                    filterText={this.state.filterText}
                />  
            </div>
        );
    }
};

const App = () => {
    const [data, setData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClickAll = async () => {
        setIsLoading(true);
        try{
            const {data} = await axios.get(`http://localhost:8080/Home/allFilms`, {
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
        handleClickAll();
    },[])
    return(
        <div>
            {err && <h2>{err}</h2>}
            {isLoading && <h2>Loading...</h2>}
            
            {data ?
            <>
            <Film film={data}/>
            {data.map((val,key)=>{
                console.log(val)
                return(
                    <tr key={key}>
                        <td>{val.film_id}</td>
                        <td>{val.title}</td>
                        <td>{val.description}</td>
                    </tr>
                )
            })}
            </>
            : <h1>HELLO</h1>}
            
        </div>
    );
};



export default App;