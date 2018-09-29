import React from 'react';
import {ScrollView, StyleSheet, Text, View,Button} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Card,Divider } from 'react-native-elements'

import { connect } from 'react-redux';
import {fetchUTSClass} from '../Redux/Actions/PlannerAction';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class PlannerScreen extends React.Component {

    static navigationOptions = {
        title: '搜索结果 31263',
    };

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentWillMount() {
        this.props.fetchUTSClass();

    }
    componentWillReceiveProps(nextProps) {
        this.setState({data:nextProps.subject});
        //console.log(nextProps.subject);
    }
    render() {
        let results = [];
        let activites = [];
        /*
        Object.keys(this.state.data).forEach( (key,idx) =>{
            //解析课程基本信息
            results.push(
            <Card key={idx}
                title={this.state.data[key].description + ' (' + this.state.data[key].semester + ')'}>
                <Text>Subject Code: {this.state.data[key].subject_code}</Text>
                <Text>Semester: {this.state.data[key].semester}</Text>
            </Card>);
            //解析Tuturials

        })
        */
        Object.values(this.state.data).map((item,idx)=>(
            /* 解析 Lecture */
            results.push(
                <Card key={idx}
                      title={item.description}>
                    <Text>学期: <Text style={{fontWeight: 'bold'}}>{item.semester}</Text></Text>
                    <Text>课号: <Text style={{fontWeight: 'bold'}}>{item.subject_code}</Text></Text>
                </Card>
            ), /* 解析Tuturial */
                Object.values(item.activities).map((item,idx)=>(
                    activites.push(
                        <Card key={idx} title={item.activity_group_code + ' #' + item.activity_code}>
                            <Text>班号: <Text style={{fontWeight: 'bold'}}>{item.activity_code}</Text></Text>
                            <Text>类型: <Text style={{fontWeight: 'bold'}}>{item.activity_type}</Text></Text>
                            <Text>开课: <Text style={{fontWeight: 'bold'}}>{item.start_date}</Text></Text>
                            <Text>星期: <Text style={{fontWeight: 'bold'}}>{item.day_of_week}</Text></Text>
                            <Text>时间: <Text style={{fontWeight: 'bold'}}>{item.start_time}</Text></Text>
                            <Text>时长: <Text style={{fontWeight: 'bold'}}>{item.duration/60}</Text> 小时</Text>
                            <Text>地点: <Text style={{fontWeight: 'bold'}}>{item.location}</Text></Text>
                            <Button title='选班' onPress={console.log('ok')}/>
                        </Card>
                    )

            ))
        ))

        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    {results}
                    {activites}
                </ScrollView>
                {/*
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="Add Subject" onPress={() => console.log("notes tapped!")}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                </ActionButton>
                */}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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

export default connect(mapStateToProps,{fetchUTSClass})(PlannerScreen);
