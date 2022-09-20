import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { Auth } from '@supabase/ui'
import type { FC } from 'react'

const AuthLogin: FC = () => {
  return (
    <>
      <div className='prose prose-zinc prose-invert lg:prose-xl mx-auto'>
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

export default AuthLogin
