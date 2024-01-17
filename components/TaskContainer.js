import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TaskContainer = React.memo((props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={(props.taskStatus == 'Not Done') ? styles.notDoneSquare : styles.doneSquare}></View>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <Text style={styles.itemText}>View Details</Text>
        </View>
    )
});

const styles = StyleSheet.create({
    item:{
        backgroundColor:'#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
  
    itemLeft:{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    doneSquare:{
        width: 24,
        height: 24,
        backgroundColor: "green",
        borderRadius: 5,
        marginRight:15,
    },
    notDoneSquare:{
        width: 24,
        height: 24,
        backgroundColor: "firebrick",
        borderRadius: 5,
        marginRight:15,
    },
    itemText:{
        fontWeight:'500',
    },
});

export default TaskContainer