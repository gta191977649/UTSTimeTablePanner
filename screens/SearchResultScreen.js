import React, {Component} from 'react';
import {Card} from "react-native-elements";
import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import connect from "react-redux/es/connect/connect";
import {fetchUTSClass} from "../Redux/Actions/PlannerAction";
import Toast from "react-native-easy-toast";

class SearchResultScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            title: `${state.params.title}`,
        };
    };
    setTitle = (titleText) => {
        const {setParams} = this.props.navigation;
        setParams({ title: titleText })
    }
    constructor(props) {
        super(props);
        this.state = {
            searchTerm:'',
            data: {},
            subject:[]
        };


    }

    componentDidMount() {
        const { navigation } = this.props;

        const keyword = navigation.getParam('searchTerm','32992');
        this.setState({searchTerm:keyword});
        console.log(this.state.searchTerm);
        this.props.fetchUTSClass(keyword);
        this.setTitle('搜索:'+keyword);


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
        let activites = [];


        const queryResults = this.state.subject.map((item,idx)=>(
            <Card key={idx}
                  title={item.description + ' (' + item.semester + ')'}>
                <Text>Subject Code: {item.subject_code}</Text>
                <Text>Semester: {item.semester}</Text>
                <Button title="选择" value="选择" onPress={()=>{this.refs.toast.show(`你选择了id ${item.description}`);}}/>

            </Card>
        ))


        /*
        Object.values(this.state.data).map((item,idx)=>(

            queryResults.push(
                [{
                    "subject_name":item.description,
                    "subject_code":item.subject_code,
                    "semester":item.semester,
                }],
            ),
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
                        <Button value='选班' title='选班' onPress={()=>{console.log('ok')}}/>
                    </Card>
                )

            ))
        ))
        */
        /*
            <Card key={idx}
                      title={item.description}>
                    <Text>学期: <Text style={{fontWeight: 'bold'}}>{item.semester}</Text></Text>
                    <Text>课号: <Text style={{fontWeight: 'bold'}}>{item.subject_code}</Text></Text>
                    <Button value='选班' title='选班' onPress={()=>{console.log('ok')}}/>

                </Card>
        */
        return (
            <View style={styles.containerView}>
                <ScrollView style={styles.container}>
                    <Text style={{textAlign:"center"}}>找到{this.state.subject.length}个相关的课程</Text>
                    {queryResults}
                </ScrollView>

                <Toast ref="toast" position='top'/>
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

export default connect(mapStateToProps,{fetchUTSClass})(SearchResultScreen);
