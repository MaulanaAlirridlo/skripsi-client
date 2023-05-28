import Image from 'next/image'
import { DataContext } from '../utils/Data'
import { useEffect, useContext, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link';

const DynamicDataTable = dynamic(() => import('react-data-table-component'), { ssr: false })

export default function Split() {
  const {data, setData} = useContext(DataContext)
  const [trainData, setTrainData] = useState([])
  const [testData, setTestData] = useState([])

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

  // a = tf-idf & lbf
  // b = tf-idf & bow
  // c = tf-idf & ef
  function cek(kelas) { 
    if (kelas == 0) {
      return 'negatif'
    } else if (kelas == 1) {
      return 'positif'
    } else {
      return 'netral'
    }
  }
  if (data.tweetTrainA && trainData.length === 0) {
    setTrainData(data.tweetTrainA.map((item, index) => ({
      tweetTrainA: item,
      tweetTrainB: data.tweetTrainB[index],
      tweetTrainC: data.tweetTrainC[index],
      xTrainA: JSON.stringify(data.xTrainA[index]),
      xTrainB: JSON.stringify(data.xTrainB[index]),
      xTrainC: JSON.stringify(data.xTrainC[index]),
      yTrainA: cek(JSON.stringify(data.yTrainA[index])),
      yTrainB: cek(JSON.stringify(data.yTrainB[index])),
      yTrainC: cek(JSON.stringify(data.yTrainC[index])),
    })))
  }

  if (data.tweetTestA && testData.length === 0) {
    setTestData(data.tweetTestA.map((item, index) => ({
      tweetTestA: item,
      tweetTestB: data.tweetTestB[index],
      tweetTestC: data.tweetTestC[index],
      xTestA: JSON.stringify(data.xTestA[index]),
      xTestB: JSON.stringify(data.xTestB[index]),
      xTestC: JSON.stringify(data.xTestC[index]),
      yTestA: cek(JSON.stringify(data.yTestA[index])),
      yTestB: cek(JSON.stringify(data.yTestB[index])),
      yTestC: cek(JSON.stringify(data.yTestC[index])),
    })))
  }

  const TrainAColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTrainA',
      cell: row => <div>{row.tweetTrainA}</div>,
    },
    {
      name: 'Pembobotan',
      selector: 'xTrainA',
      cell: row => <div style={{ width: `${row.xTrainA.length * 10}px` }}>{row.xTrainA}</div>,
    },
    {
      name: 'Class',
      selector: 'yTrainA',
      width: '200px',
    }
  ]
  const TestAColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTestA',
      cell: row => <div>{row.tweetTestA}</div>,
    },
    {
      name: 'Pembobotan',
      selector: 'xTestA',
      cell: row => <div style={{ width: `${row.xTestA.length * 10}px` }}>{row.xTestA}</div>,
    },
    {
      name: 'Class',
      selector: 'yTestA',
      width: '200px',   }
  ]

  const TrainBColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTrainB',
      cell: row => <div>{row.tweetTrainB}</div>,
    },
    {
      name: 'Pembobotan',
      selector: 'xTrainB',
      cell: row => <div style={{ width: `${row.xTrainB.length * 10}px` }}>{row.xTrainB}</div>,
    },
    {
      name: 'Class',
      selector: 'yTrainB',
      width: '200px',
    }
  ]
  const TestBColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTestB',
      cell: row => <div>{row.tweetTestB}</div>,
    },
    {
      name: 'Pembobotan',
      selector: 'xTestB',
      cell: row => <div style={{ width: `${row.xTestB.length * 10}px` }}>{row.xTestB}</div>,
    },
    {
      name: 'Class',
      selector: 'yTestB',
      width: '200px',
    }
  ]

  const TrainCColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTrainC',
      cell: row => <div>{row.tweetTrainC}</div>,
    },
    {
      name: 'Pembobotan',
      selector: 'xTrainC',
      cell: row => <div style={{ width: `${row.xTrainC.length * 10}px` }}>{row.xTrainC}</div>,
    },
    {
      name: 'Class',
      selector: 'yTrainC',
      width: '200px',
    }
  ]
  const TestCColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
      width: '50px',
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTestC',
      cell: row => <div>{row.tweetTestC}</div>,
    },
    {
      name: 'Pembobotan',
      selector: 'xTestC',
      cell: row => <div style={{ width: `${row.xTestC.length * 10}px` }}>{row.xTestC}</div>,
    },
    {
      name: 'Class',
      selector: 'yTestC',
      width: '200px',
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
          <h2 className='w-fit items-center flex ml-5 text-4xl font-bold font-mono'>Membagi Data</h2>
        </div>
        <div className='mt-5 rounded-xl text-black shadow-md bg-white'>
          <h3 className='w-fit items-center flex ml-4 text-3xl font-bold font-mono py-5'>
            TF-IDF & Lexicon Based Features
          </h3>
          <DynamicDataTable
            title={'Data Training'}
            columns={TrainAColumns}
            data={trainData}
            pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
          <DynamicDataTable
            title={'Data Testing'}
            columns={TestAColumns}
            data={testData}
            pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
        </div>
        <div className='mt-5 rounded-xl text-black shadow-md bg-white'>
          <h3 className='w-fit items-center flex ml-4 text-3xl font-bold font-mono py-5'>
            TF-IDF & Ensemble Features
          </h3>
          <DynamicDataTable
            title={'Data Training'}
            columns={TrainCColumns}
            data={trainData}
            pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
          <DynamicDataTable
            title={'Data Testing'}
            columns={TestCColumns}
            data={testData}
            pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
        </div>
        <div className='mt-5 rounded-xl text-black shadow-md bg-white'>
          <h3 className='w-fit items-center flex ml-4 text-3xl font-bold font-mono py-5'>
            TF-IDF & Bag of Words
          </h3>
          <DynamicDataTable
            title={'Data Training'}
            columns={TrainBColumns}
            data={trainData}
            pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
          <DynamicDataTable
            title={'Data Testing'}
            columns={TestBColumns}
            data={testData}
            pagination={true}
            responsive={true}
            highlightOnHover={true}
          />
        </div>
        <div className='flex justify-end'>
          <Link href="/Pembobotan" className='w-fit'>
            <button className='text-black bg-white shadow-md px-5 py-2 rounded-xl mt-5 mr-3'>Sebelumnya</button>
          </Link>
          <Link href="/SVM" className='w-fit'>
            <button className='text-black bg-white shadow-md px-5 py-2 rounded-xl mt-5'>Selanjutnya</button>
          </Link>
        </div>
      </main>
    </div>
  )
}