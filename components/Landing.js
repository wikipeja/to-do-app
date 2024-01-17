import React from 'react';
import { useState , useEffect} from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, TextInput ,Pressable, Keyboard, Platform, FlatList, ScrollView} from 'react-native';
import TaskContainer from './TaskContainer';
import {firebase} from '../config'

const Landing = ({navigation}) => {
  const [taskItems, setTaskItems] = useState([]);

  //fetch data from firebase
  const todoRef = firebase.firestore().collection('taskItems')
  useEffect(() => {
    todoRef.orderBy('createdAt', 'desc')
    .onSnapshot(querySnapshot => {
      const taskItems = []
      querySnapshot.forEach((doc) => {
        const {heading, taskStatus, description} = doc.data()
        taskItems.push({
          id:doc.id,
          heading,
          taskStatus,
          description
        })
      })
      setTaskItems(taskItems)
    })
  }, [])

//conditions for the filter
const [filter, setFilter] = useState('all');
const [filteredItems, setFilteredItems] = useState([]);
useEffect(() => {
  const taskItemsTemp = [...taskItems];
    if (filter === 'all'){
      setFilteredItems(taskItemsTemp);
    }
    else if (filter === 'done'){
      setFilteredItems(taskItemsTemp.filter(item => item.taskStatus === 'Done'));
    }
    else if (filter === 'undone'){
      setFilteredItems(taskItemsTemp.filter(item => item.taskStatus === 'Not Done'));
    }
    else if (filter === 'alphabetical'){
      setFilteredItems([...taskItemsTemp].sort((a, b) => a.heading.localeCompare(b.heading)));
    }
    else{
      setFilteredItems(taskItemsTemp);
    }
}, [filter, taskItems])

  return (
    <View style={styles.container}>
      <View style ={styles.tasksWrapper}>
        <Text style={styles.secTitle}>Tasks</Text>
        <Text style={styles.legend}>Filter: </Text>
      <View style={styles.badge}> 
        <Pressable onPress={() => setFilter('all')}>
          <Text style={styles.allSquare}>All</Text>
        </Pressable>
        <Pressable onPress={() => setFilter('done')}>
          <Text style={styles.doneSquare}>Done</Text>
        </Pressable>
        <Pressable onPress={() => setFilter('undone')}>
          <Text style={styles.notDoneSquare}>Not Done</Text>
        </Pressable> 
        <Pressable onPress={() => setFilter('alphabetical')}>
          <Text style={styles.allSquare}>A-Z</Text>
        </Pressable>
      </View>
      <View style={styles.items}>
        <FlatList
          numColumns={1}
          maxToRenderPerBatch={4}
          windowSize={10}
          data={filteredItems.slice(0,5)}
          initialNumToRender={4}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View>
              <Pressable onPress={() => { 
                navigation.navigate('Details', { item });}}>
            <View>
                <Text></Text>
                <TaskContainer text={item.heading} taskStatus={item.taskStatus} taskData={item.createdAt} taskDesc={item.description}></TaskContainer>
            </View>
              </Pressable>
            </View>
            )}
        />
        </View>
      </View>
     
     <View style={styles.writeTaskWrapper}>
        <Pressable onPress={() => navigation.navigate('Add')}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>Add a task +</Text>
            </View>
        </Pressable>
     </View>

    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e8eaed',
    },
    tasksWrapper:{
      paddingTop:25,
      paddingHorizontal:20,
    },
    secTitle:{
      fontSize:24,
      fontWeight:'bold',
      marginBottom:10,
    },
    badge:{
      marginTop:10,
      flexDirection:'row',
      justifyContent:'flex-start'
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
    addWrapper:{
      width:'auto',
      height:'auto',
      padding:15,
      backgroundColor:'dodgerblue',
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      borderColor:'#C0C0C0',
      borderWidth:1,
    },
    addText:{
      color:'white',
      fontWeight:'500',
      fontSize:'18'
    },
    allSquare:{
      backgroundColor: "dodgerblue",
      borderRadius:10,
      marginRight:15,
      color:"white",
      padding:10,
      fontSize:'18',
      fontWeight:'500',
      marginBottom:5,
      overflow: 'hidden',
  },
    doneSquare:{
      backgroundColor: "green",
      borderRadius:10,
      marginRight:15,
      color:"white",
      padding:10,
      fontSize:'18',
      fontWeight:'500',
      marginBottom:5,
      overflow: 'hidden',
  },
    notDoneSquare:{
      backgroundColor: "firebrick",
      borderRadius:10,
      marginRight:15,
      padding:10,
      color:'white',
      fontSize:'18',
      fontWeight:'500',
      marginBottom:5,
      overflow: 'hidden',
  },
  legend:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:5,
  }
  });
  

export default Landing;