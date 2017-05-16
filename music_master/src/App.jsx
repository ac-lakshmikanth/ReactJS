import React, { Component } from 'react';
import { FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import './App.css';
import Artist from './Artist';
import Gallery from './Gallery';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			query: '',
			artist: null,
			tracks: null
		};
	}

	search() {
		console.log('this.state',this.state);
		const BASE_URL = `https://api.spotify.com/v1/search?`;
		let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`; 
		const ALBUM_URL = `https://api.spotify.com/v1/artists/`;

		fetch(FETCH_URL,{
			method: 'GET'
		})
		.then(response => response.json())
		.then(json => {
			const artist = json.artists.items[0];
			console.log(artist);
			this.setState({
				artist:artist
			});

			FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US`;

			fetch(FETCH_URL, {
				method: 'GET'
			})
			.then(response => response.json())
			.then(json => {
				console.log("top-tracks", json);
				const { tracks } = json;
				this.setState({tracks});
			});
		});
	}

	render() {
		return (
			<div className="container text-center music-master-container">
				<div className="col-sm-12"><h3>Music master</h3></div>
				<div className="col-sm-12">
					<FormGroup>
						<InputGroup>
							<FormControl 
								type="text"
								placeholder="Search for an Artist"
								value={this.state.query}
								onChange={event => this.setState({query: event.target.value})}
								onKeyPress={ event => {
									if(event.key==="Enter") {
										this.search();
									}
								}}/>
							<InputGroup.Addon onClick={() => this.search()}>
								<Glyphicon glyph="search"></Glyphicon>								
							</InputGroup.Addon>	
						</InputGroup>
					</FormGroup>
				</div>
				{
					this.state.artist!==null
						? <div>
							<div className="col-sm-12">
								<Artist artist={this.state.artist} />				
							</div>
							<div className="col-sm-12">
								<Gallery tracks={this.state.tracks} />
							</div>
						</div>
						: <div></div>
				}
			</div>
		);
	}
}

export default App;