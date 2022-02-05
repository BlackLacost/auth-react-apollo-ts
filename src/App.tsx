import { gql, useQuery } from '@apollo/client'
import React from 'react'
import './App.css'

function App() {
  const { loading, error, data } = useQuery(gql`
    query Users {
      users {
        id
        username
        name
      }
    }
  `)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return <div>{JSON.stringify(data)}</div>
}

export default App
