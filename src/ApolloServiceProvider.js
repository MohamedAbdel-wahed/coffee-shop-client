import React from 'react'
import {ApolloClient,ApolloProvider,InMemoryCache,createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



let httpLink = createHttpLink({
  uri: 'https://coffee-shop-system.herokuapp.com/',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


function ApolloServiceProvider(props) {
  return (<ApolloProvider client={client} {...props}></ApolloProvider>)
}


export default ApolloServiceProvider
