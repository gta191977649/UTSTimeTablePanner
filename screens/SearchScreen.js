import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,Button} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import { SearchBar } from 'react-native-elements'

class SearchScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
        }
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }
    onSearchSubmit() {
        const { navigate } = this.props.navigation;
        navigate("SearchResult",{
            searchTerm:this.state.keyword
        });
    }
    render() {
        return (
            <View>
                <SearchBar
                    round
                    searchIcon={{ size: 24 }}
                    placeholder='Type Here...'
                    onChangeText={(keyword)=>{this.setState({keyword:keyword})}}
                    onSubmitEditing={this.onSearchSubmit}/>
            </View>
        );
    }
}

export default SearchScreen;