import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import styles from './List.scss';
import switcherStyles from '../../components/Switcher/Switcher.scss';

function List({ videos }) {
    return (
        <div className={`${styles.list} ${switcherStyles.list}`}>
            {videos.map(video => <Row {...video} key={video.youtubeId} />)}
        </div>
    );
}

function Row({
    slug, title, youtubeId, by, color,
}) {
    return (
        <Link className={styles.row} to={`/video/${slug}`} style={{ backgroundImage: getYoutubeBackground(youtubeId) }}>
            <div className={styles.avatar} style={{ backgroundColor: color }}>
                {getYoutubeInitials(by)}
            </div>
            <span className={styles.title}>{title}</span>

            <div className={styles.gradient} />
            <span className={styles.by}>by: {by}</span>
        </Link>
    );
}

function getYoutubeBackground(youtubeId) {
    return `url(https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg)`;
}

function getYoutubeInitials(by) {
    return by
        .split(' ')
        .map(name => name[0])
        .join('');
}

const mapStateToProps = ({ category, videosByCategory, videosHash }) => {
    const slugs = videosByCategory[category] || [];
    const videos = slugs.map(slug => videosHash[slug]);
    return { videos };
};

export default connect(mapStateToProps)(List);
