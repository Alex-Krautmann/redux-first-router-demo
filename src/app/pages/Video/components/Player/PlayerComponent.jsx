import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import styles from '../../Video.scss';

function Player({
    playing, youtubeId, slug, color,
}) {
    return !playing ? (
        <div className={styles.heroContainer} style={{ backgroundImage: getYoutubeBackground(youtubeId) }}>
            <Link to={`/video/${slug}/play`}>
                <span className="ion-play" style={{ backgroundColor: color }} />
            </Link>
        </div>
    ) : (
        <iframe
            className={styles.iframe}
            frameBorder="0"
            title="video-player"
            allowFullScreen
            src={getYoutubeIframeSrc(youtubeId)}
        />
    );
}

function getYoutubeBackground(youtubeId) {
    return `url(https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg)`;
}

function getYoutubeIframeSrc(youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}?playlist=${youtubeId}&autoplay=1&rel=0&theme=dark&loop=1&color=white&controls=2&autohide=1&showinfo=0`;
}

function mapStateToProps({ playing }) {
    return {
        playing,
    };
}

export default connect(mapStateToProps)(Player);
