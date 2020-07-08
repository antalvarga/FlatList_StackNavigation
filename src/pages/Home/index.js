import React, { Component } from 'react';
import api from '../../services/api';

import {View, Text, FlatList, TouchableOpacity } from 'react-native';

import styles from './styles';


//export default function Home() {
export default class Home extends Component{

    state = {
        docs: []
        , page: 1
        , 
    };

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async ( page = 1) => {
        const response = await api.get(`/products?page=${page}`); 

        const { docs, ...productInfo } = response.data;

        //console.log( docs );
        this.setState({ 
            docs: [...this.state.docs, ...docs]
            , productInfo 
            , page });

    };
    
    loadMore = () => {
        const {page, productInfo } = this.state;

        if( page === productInfo.pages ) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    };

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>

            <TouchableOpacity 
                style={styles.productButton} 
                onPress={() => {
                    this.props.navigation.navigate('Product', { product: item});
                }}
            >
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>

        </View>
    )


    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={ item => item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />    
            </View>
        );
    }
}
