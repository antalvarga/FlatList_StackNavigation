import React from 'react';
import {Text} from 'react-native';


export default function Product( {navigation} ) {

    //console.log( 'teste');

    return ( 
        <>
            <Text>Product</Text>
            <Text>{navigation.product }</Text>
        </>
    
    );
}

