import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { trcp } from '../utils/trpc'

const Home: NextPage = () => {
  const { data, error, isLoading } = trcp.useQuery(['hello'])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }

  return <div>{JSON.stringify(data)}</div>
}

export default Home
