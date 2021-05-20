import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    GridList,
    GridListTile,
    GridListTileBar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ZoomIn from '@material-ui/icons/ZoomIn';
import '../App.css';

class ImageResults extends Component {
    state = {
        open: false,
        currentImage: ''
    }

    download = () => {
        fetch(this.state.currentImage, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "image.jpg");
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleOpen = (img) => {
        this.setState({ open: true, currentImage: img });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        let imageListContent;
        const { images } = this.props;
        if (images) {
            imageListContent = (
                <GridList cols={3}>
                    {images.map(img => (
                        <GridListTile
                            key={img.id}
                            className="snip1256"
                        >
                            <img className="grow" src={img.largeImageURL} alt="" />
                            <GridListTileBar
                                className="figcaption"
                                title={<span className="h3" style={{ fontSize: 16, color: 'white' }}>Tags: {img.tags}</span>}
                                subtitle={<span className="p" style={{ fontSize: 16, color: 'white' }}>By: {img.user}</span>}
                                actionIcon={
                                    <IconButton style={{ color: 'rgba(255, 255, 255, 0.54)' }} onClick={() => this.handleOpen(img.largeImageURL)}>
                                        <ZoomIn style={{ fill: '#fff' }} />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            )
        } else {
            imageListContent = null;
        }

        return (
            <div>
                {imageListContent}
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle id="alert-dialog-title">Selected Image</DialogTitle>
                    <DialogContent>
                        <img src={this.state.currentImage} alt="" style={{ width: '100%' }} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary" autoFocus>
                            Close
                        </Button>
                        <Button color="secondary" onClick={() => this.download()} >
                            Download
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults;
