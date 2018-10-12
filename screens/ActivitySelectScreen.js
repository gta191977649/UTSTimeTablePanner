
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,Button,ActivityIndicator} from 'react-native';
import {Card, SearchBar} from "react-native-elements";
import {needSelectClass} from "../Utils/Helper";

class ActivitySelectScreen extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.title,
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            activites:[],
            selectedSubject:[],
            selectableClassType:[],//需要选择的类型，例如有些课要你选TUT和Lecture,有些课只有Lab
        }

    }

    componentWillMount() {
        const data = this.props.navigation.state.params.data;
        let activites = [];

        if(data !== null) {
            //构建Tuturial/Lecuture选课选择数组
            Object.keys(data.activites).forEach((key, idx) => {
                activites.push(data.activites[key]);
            });
            this.setState({
                activites:activites,
                selectedSubject:{
                    subject_code: data.subject_code,
                    semester: data.semester,
                    description: data.description,
                }
            });
        }

        console.log("需要选择的Class类型",needSelectClass(activites));
        this.setState({selectableClassType:needSelectClass(activites)});

    }
    onClassSelect(idx) {
        console.log("选择课程",this.state.activites[idx]);
        console.log("课程:",this.state.selectedSubject);
    }
    renderSelectableDebugMsg() {
        if(this.state.selectableClassType.length > 0) {
            return(
                <View>
                    <Text>你需要选择:</Text>
                    {this.state.selectableClassType.map((type,idx) =>(
                        <Text key={idx}>{type}</Text>
                    ))}
                </View>
            )
        }
    }
    renderClassChouseList() {
        if(this.state.activites.length > 0) {
            console.log(this.state.activites)

            return(
                this.state.activites.map((item,idx) => (
                <Card key={idx}
                      title={item.subject_code + ' (' + item.activity_type + ')'}>
                    <Text>Code: {item.activity_group_code}</Text>
                    <Text>Class: {item.activity_code}</Text>
                    <Button title="选择" value="选择" onPress={()=>{this.onClassSelect(idx)}}/>
                </Card>
            )))
        }
    }
    render() {

        return (
            <View>

                <ScrollView>
                    {this.renderSelectableDebugMsg()}
                    {this.renderClassChouseList()}
                </ScrollView>
            </View>

        );
    }
}

export default ActivitySelectScreen;
