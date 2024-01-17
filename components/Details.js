import React from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Pressable, Alert, Platform} from "react-native";
import { useState } from "react";
import {firebase} from '../config'

const Details = React.memo(({navigation, route}) => {
    const item = route.params.item
    const [task, setTask] = useState(item.heading);
    const [desc, setDesc] = useState(item.description);
    const [taskStatusTemp, setStatus] = useState(item.taskStatus);
    const todoRef = firebase.firestore().collection('taskItems');
   
  //update task
  const updateTodoTask = () => {
    if(task && task.length > 0){
      todoRef
        .doc(item.id)
        .update({heading: task, description:desc})
        .then(() => {
          navigation.goBack()
          })
        }
    }
  
  //delete task
    const deleteTodoTask = () => {
      if(task && task.length > 0){
          todoRef
          .doc(item.id)
          .delete()
          .then(() => {
              navigation.navigate('Home')
          })
      }
  }

  //mark task as done
  const markAsDone = () => {
    if(task && task.length > 0){
      todoRef
      .doc(item.id)
      .update({taskStatus:(taskStatusTemp === 'Not Done' ? 'Done' : 'Not Done' )})
      .then(() => {
        navigation.goBack()
        })
      }
    }

const deleteAlert = () =>
  Alert.alert(
    'Delete Task',
    'Are you sure to delete this task?',
    [ 
    {
        text: 'Delete task',
        onPress: () => deleteTodoTask(),
        style: 'delete',
      },
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Delete unsuccessful'),
        style: 'cancel',
      },
     
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'Alert dismissed',
        ),
    },
  );

  const updateAlert = () =>
  Alert.alert(
    'Update Task',
    'Are you sure to update this task?',
    [ 
    {
        text: 'Update task',
        onPress: () => updateTodoTask(),
        style: 'confirm',
      },
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Update unsuccessful'),
        style: 'cancel',
      },
     
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'Alert dismissed',
        ),
    },
  ) 
    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.secTitle}>Edit Task</Text>
                    <View style={styles.items}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <Text style={styles.label}>Task Title</Text>
                            <TextInput placeholder='Write a task' style={styles.input} onChangeText={text => setTask(text)} value={task}></TextInput>
                            <Text style={styles.label}>Task Description</Text>
                            <TextInput placeholder='Add a description' style={styles.input} onChangeText={desc => setDesc(desc)} value={desc}></TextInput>
                        </KeyboardAvoidingView>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.deleteButton} onPress={() => deleteAlert()}>
                            <Text style={styles.text}>Delete</Text>
                        </Pressable>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable style={(item.taskStatus == 'Done') ? styles.deleteButton : styles.doneButton} onPress={() => markAsDone()}>
                            <Text style={styles.text}>{(item.taskStatus === 'Done') ? 'Mark as undone' : 'Mark as done'}</Text>
                        </Pressable>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.updateButton} onPress={() => updateAlert()}>
                            <Text style={styles.text}>Update task</Text>
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
      updateButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        color:'black',
        backgroundColor: 'dodgerblue',
      },
      deleteButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        color:'black',
        backgroundColor: 'firebrick',
      },
      doneButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        color:'black',
        backgroundColor: 'green',
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'white',
      },
      buttonContainer:{
        padding:10,
        borderRadius: 50,
        flexDirection: "column",
        justifyContent: "space-around",
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
});

export default Details