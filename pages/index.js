import Image from 'next/image'
import { DataContext } from '../utils/Data'
import { useEffect, useContext } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link';

const DynamicDataTable = dynamic(() => import('react-data-table-component'), { ssr: false })

export default function Home() {
  const {data, setData} = useContext(DataContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [])

  const columns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
      // sortable: false,
    },
    {
      name: 'Username',
      selector: 'username',
      width: '200px',
      // sortable: true,
    },
    {
      name: 'Tweet',
      selector: 'tweet',
      // width: '1800px'
      // sortable: true,
      cell: row => <div style={{ width: `100%` }}>{row.tweet}</div>,
    },
    {
      name: 'Created at',
      selector: 'created_at',
      width: '200px',
      sortable: true,
    },
  ]

  return (
    <main className="flex min-h-screen flex-col m-auto px-24 pt-5 pb-10 bg-slate-50">
      <div className="bg-white w-1/2 rounded-xl text-black shadow-md p-5 flex">
        <Image src="/logo-polije.png" alt='logo' width={1870} height={924} style={{width: '20%', height: 'auto'}}/>
        <h2 className='w-fit items-center flex ml-5 text-4xl font-bold font-mono'>Data Asli</h2>
      </div>
      <div className='mt-5 rounded-xl text-black shadow-md'>
        <DynamicDataTable
          columns={columns}
          data={data.initData}
          pagination={true}
          highlightOnHover={true}
        />
      </div>
      <div className='flex justify-end'>
        <Link href="/Preprocessing" className='w-fit'>
          <button className='text-black bg-white shadow-md px-5 py-2 rounded-xl mt-5'>Selanjutnya</button>
        </Link>
      </div>
    </main>
  )
}
