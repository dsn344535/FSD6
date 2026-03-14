import { useState } from "react";
import {
View,
Text,
TextInput,
FlatList,
StyleSheet,
Pressable
} from "react-native";

export default function App() {

const [task,setTask] = useState("");
const [tasks,setTasks] = useState<string[]>([]);

const addTask = () =>{
 if(task.trim() === "") return;

 setTasks([...tasks,task]);
 setTask("");
};

const deleteTask = (index:number)=>{
 const newTasks = tasks.filter((t,i)=>i!==index);
 setTasks(newTasks);
};

return (

<View style={styles.container}>

<Text style={styles.title}>Task Manager</Text>

<View style={styles.inputContainer}>

<TextInput
placeholder="Enter a task..."
placeholderTextColor="#bbb"
value={task}
onChangeText={setTask}
style={styles.input}
/>

<Pressable
onPress={addTask}
style={({pressed})=>[
styles.addButton,
pressed && {opacity:0.8}
]}
>

<Text style={styles.buttonText}>ADD</Text>

</Pressable>

</View>

<FlatList
data={tasks}
keyExtractor={(item,index)=>index.toString()}
renderItem={({item,index})=>(

<View style={styles.taskCard}>

<Text style={styles.taskText}>{item}</Text>

<Pressable
onPress={()=>deleteTask(index)}
style={({pressed})=>[
styles.deleteButton,
pressed && {opacity:0.8}
]}
>

<Text style={styles.buttonText}>Delete</Text>

</Pressable>

</View>

)}
/>

</View>

);
}

const styles = StyleSheet.create({

container:{
 flex:1,
 backgroundColor:"#000",
 padding:20,
 paddingTop:70
},

title:{
 fontSize:30,
 fontWeight:"bold",
 color:"#FFD700",
 textAlign:"center",
 marginBottom:25
},

inputContainer:{
 flexDirection:"row",
 marginBottom:20
},

input:{
 flex:1,
 backgroundColor:"#111",
 borderWidth:1,
 borderColor:"#FFD700",
 borderRadius:10,
 padding:12,
 marginRight:10,
 color:"#fff"
},

addButton:{
 backgroundColor:"#FFD700",
 borderRadius:10,
 justifyContent:"center",
 alignItems:"center",
 paddingHorizontal:20
},

buttonText:{
 color:"#000",
 fontWeight:"bold"
},

taskCard:{
 backgroundColor:"#111",
 borderWidth:1,
 borderColor:"#FFD700",
 padding:15,
 borderRadius:10,
 marginBottom:12,
 flexDirection:"row",
 justifyContent:"space-between",
 alignItems:"center"
},

taskText:{
 fontSize:16,
 color:"#fff"
},

deleteButton:{
 backgroundColor:"#FFD700",
 paddingHorizontal:14,
 paddingVertical:6,
 borderRadius:6
}

});