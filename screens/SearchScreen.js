import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,Button,ActivityIndicator} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import {Card, SearchBar} from 'react-native-elements'
import { connect } from 'react-redux';
import {fetchUTSClass, fetchUTSClassActivities} from "../Redux/Actions/PlannerAction";

class SearchScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
            isLoading: false,
            subject:[],
        }
        //this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onUserEnterKeyWords = this.onUserEnterKeyWords.bind(this);
        this.onSubjectSelect = this.onSubjectSelect.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }



    onSearchSubmit() {
        console.log("搜索",this.state.keyword);
        this.props.fetchUTSClass(this.state.keyword);
        this.setState({isLoading:true});
    }

    onUserEnterKeyWords(keyword) {
        console.log(keyword.length);
        this.setState({keyword:keyword});
    }

    componentWillReceiveProps(nextProps) {

        let sujectArray = [];
        Object.keys(nextProps.subject).forEach((key, idx) => {
            if(key !== null) {
                sujectArray.push({
                    description: nextProps.subject[key].description,
                    semester: nextProps.subject[key].semester,
                    subject_code: nextProps.subject[key].subject_code,
                    activites: nextProps.subject[key].activities,
                })
            }
        });

        this.setState({subject: sujectArray, isLoading: false});

    }
    onSubjectSelect(selectedIndex) {
        if(this.state.subject.length > 0 && !this.state.isLoading) {
            //console.log(this.state.subject[selectedIndex]);
            const data = this.state.subject[selectedIndex];
            this.props.navigation.push(

                'ActivitySelect',
                {
                    data:data,
                    title:data.description
                }
            );
        }
    }

    render() {
        let queryResults;

        if(this.state.subject.length > 0) {
            queryResults = this.state.subject.map((item,idx)=>(
                <Card key={idx}
                      title={item.description + ' (' + item.semester + ')'}>
                    <Text>Subject Code: {item.subject_code}</Text>
                    <Text>Semester: {item.semester}</Text>
                    <Button title="选择" value="选择" onPress={()=>{this.onSubjectSelect(idx)}}/>
                </Card>
            ))
        } else {
            queryResults = <Text>No Result.</Text>
        }
        if(this.state.isLoading)
            queryResults = <ActivityIndicator size="large" color="#0000ff" />
        return (
            <View>
                <Toast ref="toast"/>
                <SearchBar
                    round
                    searchIcon={{ size: 24 }}
                    placeholder='Type Here...'
                    onChangeText={(keyword)=>{this.onUserEnterKeyWords(keyword)}}
                    onSubmitEditing={this.onSearchSubmit}/>
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


export default connect(mapStateToProps,{fetchUTSClass,fetchUTSClassActivities})(SearchScreen);