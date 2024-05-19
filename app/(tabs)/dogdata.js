import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

/*https://api.github.com/repos/tannerlinsley/react-query
<strong>👀 {data.subscribers_count}</strong>{' '}
<strong>✨ {data.stargazers_count}</strong>{' '}
<strong>🍴 {data.forks_count}</strong>
https://dogapi.dog/api/v2/breeds
https://dogapi.dog/api/v2/breeds/{68f47c5a-5115-47cd-9849-e45d3c378f12}
        <p>{data.type}</p>

              <div>
        <h1>{data.data[0].attributes.name}</h1>
        <h1>{data.data[1].attributes.name}</h1>
        <h1>{data.data[2].attributes.name}</h1>
        <div>{isFetching ? 'Updating...' : ''}</div>
      </div>

          function addTask(){
      setTaskName(tname);
      setId(tid + 1);
      updatedValue={
        id: tid,
        title: tname,
        completed: false
      };
      setTask(updatedValue);
      const newList = () => ([...taskList, updatedValue]);
      setTaskList(newList);
      console.log(taskList);
    }
*/

const queryClient = new QueryClient()
const dogQuery = new QueryClient()
export default function ContactPage() {
  const initialBreed =[
    {
        id: "",
        name:""
    }
  ]; 
  const[breed, setBreed]= useState({});

  // Constant for list of tasks
  const[BreedList, setBreedList] = useState([]);
	return (
		<View style={styles.container}>
        <ScrollView>
			<Text style={styles.title}>Dog Data Page</Text>
            <QueryClientProvider client={queryClient}>
            <Example />
            </QueryClientProvider>
            <QueryClientProvider client={dogQuery}>
            <Dog />
            </QueryClientProvider>
            <Link style={styles.pageLink} push href="/">
          <ThemedText style={styles.pageLink} type="link">Go to home screen!</ThemedText>
        </Link>
        </ScrollView>
		</View>
	);
}

function Example() {
    const queryClient = useQueryClient()
    const { isPending, error, data, isFetching } = useQuery({
      queryKey: ['repoData'],
      queryFn: () =>
        axios
          .get('https://dogapi.dog/api/v2/breeds')
          .then((res) => res.data),
    })
  
    if (isPending) return 'Loading...'
  
    if (error) return 'An error has occurred: ' + error.message
    // <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
    return (
      <div>
        <ul>{data?.map((data) => {
          <li key={data.id}>{data.attributes.name}</li>
          
        }
        )}</ul>
        <div>{isFetching ? 'Updating...' : ''}</div>
      </div>
    )
  }
  function Dog() {
    const { isPending, error, data, isFetching } = useQuery({
      queryKey: ['dogData'],
      queryFn: () =>
        axios
          .get('https://random.dog/woof.json')
          .then((res) => res.data),
    })
  
    if (isPending) return 'Loading...'
  
    if (error) return 'An error has occurred: ' + error.message
  
    return (
      <div>
        <h1>DOG DATA</h1>
        <p>{data.url}</p>
        <img src={data.url} width = '500' height = '500'/>
        <div>{isFetching ? 'Updating...' : ''}</div>
      </div>
    )
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'left',
      justifyContent: 'bottom',
      padding: 20,
      backgroundColor:'#FFF7CB',
      marginHorizontal: "auto"
    },
    containerTwo: {
      flex: 1,
      alignItems: 'right',
      justifyContent: 'top',
      padding: 20,
      backgroundColor:'#FFF7CB'
    },
    image:{
      width:300, 
      height:300,
      marginHorizontal: "auto"
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
    main: {
      flex: 1,
      justifyContent: "center",
      maxWidth: 960,
      marginHorizontal: "auto",
      },
    title: {
      fontSize: 64,
      fontWeight: "bold",
      fontFamily: 'Libre Baskerville',
      },
    pageLink: {
      fontSize: 25,
      color: "#38434D",
      },
    github: {
      fontSize: 25,
      color: "black",
      },
    subtitle: {
      fontSize: 36,
      color: "#38434D",
      },
    text:{
      fontFamily:'Libre Baskerville',
      fontSize: 25,
      marginHorizontal: 25,
      paddingVertical: 15
    }
  });