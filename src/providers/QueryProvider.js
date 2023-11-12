'use client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react'

const QueryProvider = ({children}) => {

  const [queryClient] = useState(() => new QueryClient({defaultOptions:{
    queries:{
      staleTime: 5*60*1000,
      refetchOnReconnect:'always',
    }
  }}))
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider;