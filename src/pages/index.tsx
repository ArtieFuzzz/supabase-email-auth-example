import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/ui'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

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
    return (
      <>
        <div className='prose prose-zinc lg:prose-xl mx-auto'>
          <div className='grid place-items-center h-screen'>
            <Auth
              supabaseClient={supabaseClient}
              socialButtonSize='medium'
              socialLayout='horizontal'
            />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <nav className='flex flex-wrap items-center justify-between p-3'>
        <div className='flex'>
          <button onClick={() => supabaseClient.auth.signOut()}> Sign out</button>
        </div>
      </nav>
      <div className='prose prose-zinc lg:prose-xl mx-auto'>
        <div className='grid place-items-center h-screen'>
          <h1>Welcome User {user?.id}</h1>
        </div>
      </div>
    </>
  )
}

export default Home
