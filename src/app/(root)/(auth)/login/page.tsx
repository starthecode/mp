'use client';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [loader, setLoader] = React.useState<boolean>(false);
  const session = useSession();

  React.useEffect(() => {
    if (session?.status === 'authenticated') {
      router.replace(localStorage.getItem('path') || '/');
    }
  });

  const loginUser = async () => {
    setLoader(true);
    //@ts-ignore
    await signIn('google', null, { redirect: false, prompt: 'login' });
    // await signIn('azure-ad', null, {
    //   redirect: true,
    //   prompt: 'login',
    //   callbackUrl: '/dashboard',
    // });
  };

  return (
    <>
      <section className="dark:bg-slate-900 bg-gray-100 flex h-screen items-center py-16">
        <div className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center justify-center flex flex-col items-center">
                <Image
                priority
                  className="mb-4"
                  src="/assets/imgs/application-logo.png"
                  width={50}
                  height={50}
                  alt="sign-logo"
                />
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Sign in
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Use google account to sign in.
                </p>
              </div>

              <div className="mt-5">
                <button
                  disabled={loader}
                  onClick={loginUser}
                  type="button"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <svg
                    className="w-4 h-auto"
                    width="46"
                    height="47"
                    viewBox="0 0 46 47"
                    fill="none"
                  >
                    <path
                      d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                      fill="#34A853"
                    />
                    <path
                      d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                      fill="#EB4335"
                    />
                  </svg>
                  {loader ? (
                    <div className="flex gap-2">
                      <span>loading..</span>
                      <span> Signin...</span>
                    </div>
                  ) : (
                    <span className="flex gap-2">
                      <svg
                        id="fi_2111483"
                        fill="white"
                        enableBackground="new 0 0 24 24"
                        height="25"
                        viewBox="0 0 24 24"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m21.823 9h-2.187v2.177h-2.177v2.187h2.177v2.177h2.187v-2.177h2.177v-2.187h-2.177z"></path>
                        <path d="m7.5 19.5c4.328 0 7.203-3.038 7.203-7.326 0-.491-.051-.87-.122-1.248h-7.08v2.578h4.257c-.174 1.095-1.289 3.233-4.257 3.233-2.557 0-4.645-2.118-4.645-4.737s2.087-4.738 4.645-4.738c1.463 0 2.435.624 2.988 1.156l2.036-1.954c-1.311-1.227-2.999-1.964-5.025-1.964-4.144 0-7.5 3.356-7.5 7.5s3.356 7.5 7.5 7.5z"></path>
                      </svg>
                      Signin with Google
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
