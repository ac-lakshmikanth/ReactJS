import React, { Component } from 'react';

class Gallery extends Component {
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
						? <div key={k} className="track">					
							<img 
								src={trackImg}
								className="track-img"
								alt="track"
							/>
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