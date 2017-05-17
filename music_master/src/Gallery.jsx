import React, { Component } from 'react';

class Gallery extends Component {

	constructor(props) {
		super(props);
		this.state = {
			playingUrl: '',
			playiing: false,
			audio: null
		};
	}
	
	playAudio(audioUrl) {
		let audio = new Audio(audioUrl);
		if(!this.state.playing) {
			audio.play();
			this.setState({
				playing:true,
				playingUrl: audioUrl,
				audio
			});

		} else {
			if(this.state.playingUrl === audioUrl) {
				this.state.audio.pause();
				this.setState({
					playing: false
				});
			} else if(this.state.playingUrl) {
				this.state.audio.pause();
				audio.play();
				this.setState({
					playing: true,
					playingUrl: audioUrl,
					audio
				});
			}		
		}
	}

	render() {
		console.log('this.props',this.props);
		const { tracks } = this.props;
		return (
			tracks!==null
			? <div>
				{tracks.map((track,k) => {
					const trackImg = track.album && track.album.images ? track.album.images[0].url : null;
					return (
						trackImg!==null 
						? <div key={k} className="track" onClick={() => this.playAudio(track.preview_url)}>					
							<img 
								src={trackImg}
								className="track-img"
								alt="track"
							/>
							<div className="track-play">
								<div className={this.state.playingUrl===track.preview_url?'track-play-inner-active':'track-play-inner'}>
									{ this.state.playingUrl===track.preview_url ? <span>| |</span> : <span>&#9654;</span> }
								</div>
							</div>
							<p className="track-text">{track.name}</p>
						</div>
						: <div></div>
					);
				})}
			</div>
			: <div></div>
		);
	};
}

export default Gallery;