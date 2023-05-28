import Image from 'next/image'
import { DataContext } from '../utils/Data'
import { useEffect, useContext, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link';

const DynamicDataTable = dynamic(() => import('react-data-table-component'), { ssr: false })

export default function Pembobotan() {
  const {data, setData} = useContext(DataContext)
  const [mergedData, setMergedData] = useState([])

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

  if (data.cleanTweet && mergedData.length === 0) {
    setMergedData(data.cleanTweet.map((item, index) => ({
      cleanTweet: item,
      tweet: data.initData[index].tweet,
      lbf: JSON.stringify([data.pos[index], data.neg[index], data.neu[index]]),
      ef: JSON.stringify(data.ef[index]),
      bow: JSON.stringify(data.bow[index]),
    })))
  }

  const lbfColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tweet Bersih',
      selector: 'cleanTweet',
      cell: row => <div style={{ width: `${row.cleanTweet.length * 10}px` }}>{row.cleanTweet}</div>,
    },
    {
      name: 'Lexicon Based Features',
      selector: 'lbf',
      width: '200px',
    }
  ]

  const efColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tweet',
      selector: 'tweet',
      cell: row => <div style={{ width: `${row.tweet.length * 10}px` }}>{row.tweet}</div>,
    },
    {
      name: 'Ensemble Features',
      selector: 'ef',
      cell: row => <div style={{ width: `${row.ef.length * 10}px` }}>{row.ef}</div>,
    }
  ]

  const bowColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tweet Bersih',
      selector: 'cleanTweet',
      cell: row => <div style={{ width: `${row.cleanTweet.length * 10}px` }}>{row.cleanTweet}</div>,
    },
    {
      name: 'Bag of Words',
      selector: 'bow',
      cell: row => <div style={{ width: `${row.bow.length * 10}px` }}>{row.bow}</div>,
    }
  ]

  return (
    <div>
      <header className="bg-slate-50">
        <div className="justify-between bg-white shadow-lg text-black flex p-4 px-24 relative">
          <Link href="/">Data Asli</Link>
          <Link href="/Preprocessing">Preprocessing</Link>
          <Link href="/TfIdf">Pembobotan 1</Link>
          <Link href="/Pembobotan">Pembobotan 2</Link>
          <Link href="/Split">Split Data</Link>
          <Link href="/SVM">SVM</Link>
          <Link href="/Kesimpulan">Kesimpulan</Link>
        </div>
      </header>

      <main className="flex min-h-screen flex-col m-auto px-24 pt-5 pb-10 bg-slate-50">
        <div className="bg-white w-1/2 rounded-xl text-black shadow-md p-5 flex">
          <Image src="/logo-polije.png" alt='logo' width={1870} height={924} style={{width: '20%', height: 'auto'}}/>
          <h2 className='w-fit items-center flex ml-5 text-4xl font-bold font-mono'>Pembobotan</h2>
        </div>
        <div className='mt-5 rounded-xl text-black shadow-md'>
          <DynamicDataTable
            title={'Lexicon Based Features'}
            columns={lbfColumns}
            data={mergedData}
            pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
        </div>
        <div className='mt-5 rounded-xl text-black shadow-md'>
          <DynamicDataTable
            title={'Ensemble Features'}
            columns={efColumns}
            data={mergedData}
            pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
        </div>
        <div className='mt-5 rounded-xl text-black shadow-md'>
          <DynamicDataTable
            title={'Bag of Words'}
            columns={bowColumns}
            data={mergedData}
            pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
        </div>
        <div className='flex justify-end'>
          <Link href="/TfIdf" className='w-fit'>
            <button className='text-black bg-white shadow-md px-5 py-2 rounded-xl mt-5 mr-3'>Sebelumnya</button>
          </Link>
          <Link href="/Split" className='w-fit'>
            <button className='text-black bg-white shadow-md px-5 py-2 rounded-xl mt-5'>Selanjutnya</button>
          </Link>
        </div>
      </main>
    </div>
  )
}