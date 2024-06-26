import { StyleSheet, Text, View } from "react-native";
import { Link, router, Redirect } from 'expo-router';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>

        <Text style={styles.azariasTitle}>Azarias'</Text>
        <Text style={styles.title}>Dog Website</Text>
        <Text style={styles.subtitle}>Welcome to my dog website.</Text>
        <Link style={styles.pageLink} push href= '/dogdata'>GO TO DOG DATA PAGE</Link>
        
      </View>
    </View>
  );
}

/*https://api.github.com/repos/tannerlinsley/react-query
<strong>👀 {data.subscribers_count}</strong>{' '}
<strong>✨ {data.stargazers_count}</strong>{' '}
<strong>🍴 {data.forks_count}</strong>
https://dogapi.dog/api/v2/breeds
https://dogapi.dog/api/v2/breeds/{68f47c5a-5115-47cd-9849-e45d3c378f12}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: '#CBFFF4'
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  azariasTitle: {
    fontFamily: 'Libre Baskerville',
    fontSize: 64,
    fontWeight: "bold",
  },
  title: {
    fontFamily: 'Libre Baskerville',
    fontSize: 64,
    fontWeight: "bold",
  },
  pageLink: {
    fontSize: 25,
    color: "#38434D",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});