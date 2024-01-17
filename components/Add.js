import React from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Pressable, Keyboard, Platform} from "react-native";
import { useState } from "react";
import {firebase} from '../config'

const Details = React.memo(({navigation}) => {
    const [task, setTask] = useState();
    const [desc, setDesc] = useState('');
    const todoRef = firebase.firestore().collection('taskItems');

    //add new task
    const addTodoTask = () => {
        if(task && task.length > 0){
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          const data = {
            heading: task,
            createdAt: timestamp,
            taskStatus: 'Not Done',
            description:desc,
          };
          todoRef
          .add(data)
          .then(() => {
            setTask('');
            Keyboard.dismiss();
            navigation.goBack();
          })
          .catch((error) => navigation.goBack())
        }
      }
    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.secTitle}>Add a Task</Text>
                    <View style={styles.items}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <Text style={styles.label}>Task Title <Text style={styles.textMuted}> - Required</Text></Text> 
                            
                            <TextInput placeholder='Write a task' style={styles.input} onChangeText={text => setTask(text)} value={task}></TextInput>
                            <Text style={styles.label}>Task Description <Text style={styles.textMuted}> - Optional</Text></Text>
                            <TextInput placeholder='Add a description' style={styles.input} onChangeText={desc => setDesc(desc)} value={desc}></TextInput>
                        </KeyboardAvoidingView>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.addButton} onPress={() => addTodoTask()}>
                            <Text style={styles.text}>Add task</Text>
                        </Pressable>
                    </View>
            </View>
        </View>
    )
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8eaed',
      },
      label:{
        fontWeight:'bold'
      },
      tasksWrapper:{
        paddingTop:25,
        paddingHorizontal:20,
      },
      secTitle:{
        fontSize:24,
        fontWeight:'bold',
      },
      items:{
        marginTop:30,
      },
      writeTaskWrapper:{
        position:'absolute',
        bottom:60,
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
      },
      input:{
        paddingVertical:15,
        paddingHorizontal:15,
        width:250,
        backgroundColor:"#fff",
        borderRadius:60,
        borderColor:'#C0C0C0',
        borderWidth:1,
      },
      addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        color:'black',
        backgroundColor: 'dodgerblue',
      },
      input:{
        backgroundColor:"#fff",
        borderRadius:60,
        borderColor:'#C0C0C0',
        borderWidth:1,
        padding: 15,
        marginBottom:10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'white',
      },
      textMuted: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'gray',
      }
});

export default Details