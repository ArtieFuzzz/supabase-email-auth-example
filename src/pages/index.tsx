import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@supabase/auth-helpers-react'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import AuthLogin from '../components/AuthLogin'

const Home: NextPage = () => {
  const { user, error } = useUser()
  const [data, setData] = useState<any>({})

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*')
      setData(data!)
    }

    if (user) loadData()
  }, [user])

  if (!user) {
    console.error(error)
    return <AuthLogin/>
  }

  return (
    <>
      <nav className='flex flex-wrap items-center justify-between p-3 mx-auto'>
        <div className='flex'>
          <button onClick={() => supabaseClient.auth.signOut()}> Sign out</button>
        </div>
      </nav>
      <div className='prose prose-zinc prose-invert lg:prose-xl mx-auto'>
        <div className='grid justify-center place-items-center h-[90vh]'>
          <h1 className='text-white'>Welcome User {user?.id}</h1>
        </div>
      </div>
    </>
  )
}

export default Home
