import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from './components/AlbumList';
import { Hidden } from '@material-ui/core';

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Top 100 Nhạc Trữ Tình Hay Nhất',
            thumbnailUrl:
                'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/f/9/8/7/f987690e18af09d221abd9c0aab7a44d.jpg',
        },
        {
            id: 2,
            name: 'Top 100 Pop Âu Mỹ Hay Nhất',
            thumbnailUrl:
                'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/9/5/4/7/95473f42319ac6c5e4934ea446534a86.jpg',
        },
        {
            id: 3,
            name: 'Top 100 Bài Nhạc Trẻ Hay Nhất',
            thumbnailUrl:
                'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/4/5/e/b/45eba7c84e14dbcfe545db7c0ad4b1fa.jpg',
        },
    ];
    return (
        <div style={{ overflowX: 'hidden' }}>
            <h2>Có Thể Bạn Sẽ Thích</h2>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;
