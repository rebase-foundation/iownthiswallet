import * as React from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { useRouter } from 'next/router';
import { Account, Connect } from '../components'
import { useIsMounted } from '../hooks'
import Error from 'next/error';

function Page() {
  const router = useRouter();
  const email = router.query.email;
  const isMounted = useIsMounted();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: 'I own this wallet',
  })
  const { data: account } = useAccount();
  const [message, setMessage] = React.useState('');

  if (!email) {
    return <Error statusCode={404} />
  }

  function onSignMessage(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    signMessage({
      message: "I own this wallet"
    })
    console.log("Sign");
    setMessage("TEST");
  }

  return (
    <>
      <div className='flex flex-col gap-10 mt-20 w-full h-full text-center'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-3xl font-semibold'>I own this wallet</h1>
          <p>Send {email} an email that proves you own this wallet</p>
        </div>

        <div className='flex flex-col gap-5'>
          <Connect />
          {isMounted && account && (
            <>
              <Account />
            </>
          )}
        </div>

        {isMounted && account && (
          <>
            <button 
            className='mx-auto'
            onClick={onSignMessage}
            >
              Sign Message
            </button>
          </>
        )}

        {isMounted && account && isSuccess && (
          <>
            <a href={"mailto:"+email+"?subject=I own this wallet&body=Wallet Address: "+account.address+" Signed Message: "+data}>
              <button>Send Message</button>
            </a>
          </>
        )}

      </div>
    </>
  )
}

export default Page
