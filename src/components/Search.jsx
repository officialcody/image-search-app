import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem } from '@material-ui/core';
import ImageResults from './ImageResults';
class Search extends Component {
    state = {
        searchText: '',
        amount: 15,
        apiURL: 'https://pixabay.com/api',
        apiKey: '7505650-dc3a5a30ab7681a5b568fdb6f',
        images: []
    }

    onTextChange = (e) => {
        const val = e.target.value;
        this.setState({ [e.target.name]: val }, () => {
            if (val === '') {
                axios.get(`${this.state.apiURL}/?key=${this.state.apiKey}&q=trending&image_type=photo&per_page=${this.state.amount}&safesearch=true`).then(res => this.setState({ images: res.data.hits })).catch(err => console.log(err));
            } else {
                axios.get(`${this.state.apiURL}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`).then(res => this.setState({ images: res.data.hits })).catch(err => console.log(err));
            }
        });
    }

    getInitialImages = () => {
        axios.get(`${this.state.apiURL}/?key=${this.state.apiKey}&q=trending&image_type=photo&per_page=${this.state.amount}&safesearch=true`).then(res => this.setState({ images: res.data.hits })).catch(err => console.log(err));
        return this.state.images
    }

    onAmountChange = (e) => this.setState({ amount: e.target.value });

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <TextField name="searchText" className="searchbar" label="Search for images" value={this.state.searchText} onChange={this.onTextChange} placeholder="Search for Images" />
                <br />
                <Select name="amount" className="select" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange}>
                    <MenuItem value={5} primaryText="5">5</MenuItem>
                    <MenuItem value={10} primaryText="10">10</MenuItem>
                    <MenuItem value={15} primaryText="15">15</MenuItem>
                    <MenuItem value={30} primaryText="30">30</MenuItem>
                    <MenuItem value={50} primaryText="50">50</MenuItem>
                </Select>
                <br />
                { this.state.images.length > 0 ? <ImageResults images={this.state.images} /> : "No images to display"}
            </div>
        )
    }
}

export default Search
