import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,Button} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import {Card, SearchBar} from 'react-native-elements'
import connect from "react-redux/es/connect/connect";
import {fetchUTSClass} from "../Redux/Actions/PlannerAction";

class SearchScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            subject:[]
        }
        //this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onUserEnterKeyWords = this.onUserEnterKeyWords.bind(this);
    }
    /*
    onSearchSubmit() {
        const { navigate } = this.props.navigation;
        navigate("SearchResult",{
            searchTerm:this.state.keyword
        });
    }
    */
    onUserEnterKeyWords(keyword) {
        console.log(keyword.length);
        if(keyword.length > 0) {
            this.props.fetchUTSClass(keyword);
        } else {
            this.setState({subject:[]});
        }
    }
    componentWillReceiveProps(nextProps) {
        let sujectArray = [];
        Object.keys(nextProps.subject).forEach( (key,idx) =>{
            sujectArray.push({
                description:nextProps.subject[key].description,
                semester:nextProps.subject[key].semester,
                subject_code:nextProps.subject[key].subject_code,
            })
        });

        this.setState({subject:sujectArray});

    }

    render() {
        let queryResults;
        if(this.state.subject.length > 0) {
            queryResults = this.state.subject.map((item,idx)=>(
                <Card key={idx}
                      title={item.description + ' (' + item.semester + ')'}>
                    <Text>Subject Code: {item.subject_code}</Text>
                    <Text>Semester: {item.semester}</Text>
                    <Button title="选择" value="选择" onPress={()=>{this.refs.toast.show(`你选择了id ${item.description}`);}}/>
                </Card>
            ))
        } else {
            queryResults = <Text>No Result.</Text>
        }
        return (
            <View>
                <Toast ref="toast"/>
                <SearchBar
                    round
                    searchIcon={{ size: 24 }}
                    placeholder='Type Here...'
                    onChangeText={(keyword)=>{this.onUserEnterKeyWords(keyword)}}
                    onSubmitEditing={(keyword)=>{console.log("Ebter")}}/>
                <ScrollView style={styles.container}>
                    {queryResults}
                </ScrollView>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#F5F5F5',
    },

    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

const mapStateToProps = state => ({
    subject: state.Planner.subject,
    error: state.Planner.error,
    errorMsg: state.Planner.errorMsg
})


export default connect(mapStateToProps,{fetchUTSClass})(SearchScreen);