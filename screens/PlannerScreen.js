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
        title: '课程计划',
    };

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentWillMount() {
        //this.props.fetchUTSClass(31242);

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


        return (
            <View style={styles.container}>

                <ScrollView style={styles.container}>

                </ScrollView>
                {
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="新增课程" onPress={() => this.props.navigation.push('Search')}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                </ActionButton>
                }

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
