import React, { ReactElement, useState, useEffect } from 'react'
import useAxios from 'axios-hooks'
import logo from './logo.svg'
import { removeHtmlTags } from './helpers'

function App(): ReactElement {
  const [keyword, setKeyword] = useState('')
  const [endPoint, setEndPoint] = useState('/shows')
  const [{ data, loading, error }, refetch] = useAxios({
    url: `https://api.tvmaze.com${endPoint}`,
    withCredentials: false
  })
  useEffect(() => {
    refetch()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(`/search/shows?q=${e.target.value}`)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setEndPoint(keyword)
    refetch()
  }

  // console.log(data)

  return (
    <div className="border border-gray-50 p-5">
      <header>
        <div className="flex justify-center">
          <form
            className="pt-2 relative mx-auto text-gray-600"
            onSubmit={handleSubmit}
          >
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pl-10 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
              onChange={handleSearch}
            />
            <button type="submit" className="absolute left-0 top-0 mt-5 ml-4">
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </form>
        </div>
      </header>
      <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((l: any, index: number) => (
            <div
              key={index}
              className="max-w-md w-full lg:flex rounded-xl shadow-lg"
            >
              <div
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                style={{
                  backgroundImage: `url(${
                    l?.image?.medium || l?.show.image?.medium
                  })`
                }}
                title="Woman holding a mug"
              ></div>
              <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                  <div className="text-black font-bold text-xl mb-2">
                    {l?.name || l?.show?.name}
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <p className="text-gray-600 font-bold text-sm ml-1">
                      {l?.rating?.average || l?.show?.rating?.average || 0}/10
                    </p>
                  </div>
                  <p className="text-grey-darker text-base">
                    {removeHtmlTags(l?.summary || l?.show?.summary)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
