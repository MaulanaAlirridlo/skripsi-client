import Image from 'next/image'
import { DataContext } from '../utils/Data'
import { useEffect, useContext, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link';

const DynamicDataTable = dynamic(() => import('react-data-table-component'), { ssr: false })

export default function Preprocessing() {
  const {data, setData} = useContext(DataContext)
  const [mergedData, setMergedData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/all');
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [])

  if (data.initData && mergedData.length === 0) {
    setMergedData(data.initData.map((item, index) => ({
      tweet: item.tweet, 
      caseFolding: data.preprocessing[index].caseFolding,
      dataCleaning: data.preprocessing[index].dataCleaning,
      stopwordRemoval: data.preprocessing[index].stopwordRemoval,
      stemming: data.preprocessing[index].stemming,
    })))
  }
  console.log(mergedData)

  const columns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
    },
    {
      name: 'Tweet',
      selector: 'tweet',
    },
    {
      name: 'Case Folding',
      selector: 'caseFolding',
    },
    {
      name: 'Data Cleaning',
      selector: 'dataCleaning',
    },
    {
      name: 'Stopword Removal',
      selector: 'stopwordRemoval',
    },
    {
      name: 'Stemming',
      selector: 'stemming',
    },
  ]

  return (
    <main className="flex min-h-screen flex-col m-auto px-24 pt-5 pb-10 bg-slate-50">
      <div className="bg-white w-1/2 rounded-xl text-black shadow-md p-5 flex">
        <Image src="/logo-polije.png" alt='logo' width={1870} height={924} style={{width: '20%', height: 'auto'}}/>
        <h2 className='w-fit items-center flex ml-5 text-4xl font-bold font-mono'>Preprocessing</h2>
      </div>
      <div className='mt-5 rounded-xl text-black shadow-md'>
        <DynamicDataTable
          columns={columns}
          data={mergedData}
          pagination={true}
          responsive={true}
          highlightOnHover={true}
        />
      </div>
      <div className='flex justify-end'>
        <Link href="/" className='w-fit'>
          <button className='text-black bg-white shadow-md px-5 py-2 rounded-xl mt-5 mr-3'>Sebelumnya</button>
        </Link>
        <Link href="/TfIdf" className='w-fit'>
          <button className='text-black bg-white shadow-md px-5 py-2 rounded-xl mt-5'>Selanjutnya</button>
        </Link>
      </div>
    </main>
  )
}