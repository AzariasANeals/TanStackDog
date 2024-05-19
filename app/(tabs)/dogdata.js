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

*/

const queryClient = new QueryClient()
const dogQuery = new QueryClient()
const detailedDog = new QueryClient()
const dogFacts = new QueryClient()
const dogGroups = new QueryClient()
export default function ContactPage() {
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

            <QueryClientProvider client={detailedDog}>
                <DetailedDog />
            </QueryClientProvider>
            
            <QueryClientProvider client={dogFacts}>
                <DogFacts />
            </QueryClientProvider>

            <QueryClientProvider client={dogGroups}>
                <DogGroups />
            </QueryClientProvider>
            <Link style={styles.pageLink} push href="/">
          <ThemedText style={styles.pageLink} type="link">Go to home screen!</ThemedText>
        </Link>
        </ScrollView>
		</View>
	);
}

function DogGroups(){
  const { isPending, error, data, isFetching, isSuccess } = useQuery({
    queryKey: ['dogGroups'],
    queryFn: () =>
      axios
        .get('https://dogapi.dog/api/v2/groups')
        .then((res) => res.data),
  })
  
  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message
  
  if (isSuccess) return(
    <div>
      <h1>Dog Groups to check out</h1>
      <p>- {data.data[0].attributes.name}</p>
      <p>- {data.data[1].attributes.name}</p>
      <p>- {data.data[2].attributes.name}</p>
      <p>- {data.data[3].attributes.name}</p>
      <p>- {data.data[4].attributes.name}</p>
      <p>- {data.data[5].attributes.name}</p>
      <p>- {data.data[6].attributes.name}</p>
      <p>- {data.data[7].attributes.name}</p>
      <p>- {data.data[8].attributes.name}</p>

      <p style={styles.small}> Data Fetching: SUCCESS!</p>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  )
  }

function DogFacts(){
const { isPending, error, data, isFetching, isSuccess } = useQuery({
  queryKey: ['dogFacts'],
  queryFn: () =>
    axios
      .get('https://dogapi.dog/api/v2/facts')
      .then((res) => res.data),
})

if (isPending) return 'Loading...'
if (error) return 'An error has occurred: ' + error.message

if (isSuccess) return(
  <div>
    <h1>Dog Facts! Did you know?</h1>
    <p>{data.data[0].attributes.body}</p>

    <p style={styles.small}> Data Fetching: SUCCESS!</p>
    <div>{isFetching ? 'Updating...' : ''}</div>
  </div>
)
}

function DetailedDog() {
  const { isPending, error, data, isFetching, isSuccess } = useQuery({
    queryKey: ['DetailedDog'],
    queryFn: () =>
      axios
        .get('https://dogapi.dog/api/v2/breeds/68f47c5a-5115-47cd-9849-e45d3c378f12')
        .then((res) => res.data),
  })

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  if (isSuccess) return(
    <div>
      <h1>Specific Dog Breed</h1>
      <p>Name: {data.data.attributes.name}</p>
      <p>Brief Description: {data.data.attributes.description}</p>
      <p>Maximum Life Expectancy: {data.data.attributes.life.max} Years.</p>
      <p>Minimum Life Expectancy: {data.data.attributes.life.min} Years.</p>
      <p>Male Maximum Weight: {data.data.attributes.male_weight.max} pounds.</p>
      <p>Male Minimum Weight: {data.data.attributes.male_weight.min} pounds.</p>
      <p>Female Maximum Weight: {data.data.attributes.female_weight.max} pounds.</p>
      <p>Female Minimum Weight: {data.data.attributes.name} pounds.</p>

      <p style={styles.small}> Data Fetching: SUCCESS!</p>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  )
}
function Example() {
    const { isPending, error, data, isFetching, isSuccess } = useQuery({
      queryKey: ['repoData'],
      queryFn: () =>
        axios
          .get('https://dogapi.dog/api/v2/breeds')
          .then((res) => res.data),
    })
  
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
  
    if (isSuccess) return(
      <div>
        <h1>LIST OF DOG TYPES</h1>
        <p>- {data.data[0].attributes.name}</p>
        <p>- {data.data[1].attributes.name}</p>
        <p>- {data.data[2].attributes.name}</p>
        <p>- {data.data[3].attributes.name}</p>
        <p>- {data.data[4].attributes.name}</p>
        <p>- {data.data[5].attributes.name}</p>
        <p>- {data.data[6].attributes.name}</p>
        <p>- {data.data[7].attributes.name}</p>
        <p>- {data.data[8].attributes.name}</p>
        <p>- {data.data[9].attributes.name}</p>
        <p style={styles.small}> Data Fetching: SUCCESS!</p>
        <div>{isFetching ? 'Updating...' : ''}</div>
      </div>
    )
  }
  function Dog() {
    const { isPending, error, data, isFetching, } = useQuery({
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
        <h1>Random Dog Image</h1>
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
    small: {
      fontSize: 15,
      fontWeight: 'bold',
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