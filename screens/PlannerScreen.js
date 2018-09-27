import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';
import { connect } from 'react-redux';
import {fetchUTSClass} from '../Redux/Actions/PlannerAction';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class PlannerScreen extends React.Component {

    static navigationOptions = {
        title: 'Planner',
    };

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.fetchUTSClass();

    }
    render() {

        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <Text>{JSON.stringify(this.props.subject)}</Text>

                </ScrollView>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="Add Subject" onPress={() => console.log("notes tapped!")}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                </ActionButton>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
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
