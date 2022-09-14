import React, {useEffect, useState} from "react";
import axios from "axios";

class FilmRow extends React.Component{
    render(){
        return(
            <tr>
                <td class="film_id_loaded" style={{"border":"1px solid"}}>{this.props.film.title}</td>
                <td style={{"border":"1px solid"}}>{this.props.film.category[0].name}</td>
                <td style={{"border":"1px solid"}}>{this.props.film.rating}</td>
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
                    key={films.film_id}
                />
            )
        })
        const tablestyle = {
            "border": "1px solid"
        };
        return(
            <table style={tablestyle}>
                <thead style={tablestyle}>
                    <tr>
                        <th style={tablestyle}>Title</th>
                        <th style={tablestyle}>Category</th>
                        <th style={tablestyle}>Rating</th>
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
            <div class="page-loaded">
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

    const handleClickAll = async (url) => {
        setIsLoading(true);
        try{
            const {data} = await axios.get(url, {
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
        handleClickAll(`https://sakilaapp-1663062389506.azurewebsites.net/Home/allFilms`);
    },[])
    return(
        <div>
            {err && <h2>{err}</h2>}
            {isLoading && <h2>Loading...</h2>}
            {data ?
                <>
                    <Film film={data}/>
                </>
            : <></>}
        </div>
    );
};



export default App;