import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import {Card, SearchBar} from "react-native-elements";
import {needSelectClass} from "../Utils/Helper";
import {getSubjects, saveTimetable, setSubjects} from "../Redux/Actions/PlannerAction";
import {connect} from 'react-redux';

class ActivitySelectScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            allActivites: [],
            selectedSubject: [],
            selectableClassType: [],//需要选择的类型，例如有些课要你选TUT和Lecture,有些课只有Lab
            classType: null,//当前需要选课的类型
        }

    }

    componentWillMount() {
        //取得保存的科目
        const data = this.props.navigation.state.params.data;
        let activites = [];
        let selectedSubject = [];
        if (data !== null) {
            //构建Tuturial/Lecuture选课选择数组
            Object.keys(data.activites).forEach((key, idx) => {
                activites.push(data.activites[key]);
            });

            //根据要选择的Activity类型嵌入Json
            let jsonContent = {
                subject_code: data.subject_code,
                semester: data.semester,
                description: data.description,
                activites: [],
            }

            let needsSelectClass = needSelectClass(activites);
            needsSelectClass.map((type) => (
                jsonContent.activites.push({
                    selection: null,
                    type: type,
                })
            ));

            selectedSubject = jsonContent;

        }

        //console.log("state json",selectedSubject);
        //console.log("需要选择的Class类型",needSelectClass(activites));
        this.setState({
            selectableClassType: needSelectClass(activites),
            allActivites: activites,
            selectedSubject: selectedSubject,
            classType: this.getNextSelectClassType(selectedSubject)
        });

    }
    componentDidUpdate() {
        if(this.state.classType === "done") { //当选课完毕后
            //储存新的课
            let newSubject = this.props.getSubjects();
            newSubject.push(this.state.selectedSubject);
            this.props.saveTimetable(newSubject);
            this.props.setSubjects(newSubject);
            console.log("保存了数据");
            //跳转到首页
            this.props.navigation.navigate('Home');
        }
    }
    getNextSelectClassType(selectedSubject) {
        //找出下一个要选择的Class的类型.
        console.log("下一个:",selectedSubject);
        let classType = "done";
        selectedSubject.activites.forEach((key) => {
            console.log("遍历:",key.type);
            if (key.selection === null) {

                classType = key.type;
                return;
            };
        });
        return classType;
    }

    onClassSelect(idx) {
        //console.log("需要选择的课:", this.getNextSelectClassType(this.state.selectedSubject));
        let selectedSubject = this.state.selectedSubject;
        //console.log("选择的activites",this.state.activites[idx]);
        //console.log("课程:",this.state.selectedSubject);
        selectedSubject.activites.forEach((item)=>{
            if(item.type === this.state.classType) {
                item.selection = this.state.allActivites[idx];
                return;
            }
        })
        console.log("选择后:",selectedSubject);

        //Debug
        //挪动下一个classType
        this.setState({classType:this.getNextSelectClassType(selectedSubject)});
        //保存新的科目到AsynStorage
        //this.props.saveTimetable(newSubject);


    }

    renderSelectableDebugMsg() {
        return(
            <Text>你需要选择{this.state.classType}</Text>
        )
    }

    renderClassChouseList() {
        if (this.state.allActivites.length > 0) {
            //console.log(this.state.allActivites)

            return (
            this.state.allActivites.map((item, idx) => {
                //过滤掉不需要选的内容

                if(item.activity_group_code === this.state.classType) {
                    return (
                        <Card key={idx}
                              title={item.subject_code + ' (' + item.activity_type + ')'}>
                            <Text>Code: {item.activity_group_code}</Text>
                            <Text>Class: {item.activity_code}</Text>
                            <Button title="选择" value="选择" onPress={() => {
                                this.onClassSelect(idx)
                            }}/>
                        </Card>
                    );
                }
            }))
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

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {getSubjects, saveTimetable,setSubjects})(ActivitySelectScreen);
