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
        const response = await fetch('http://localhost:5000/all');
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
      yTestA: JSON.stringify(data.yTestA[index]),
      yTestB: JSON.stringify(data.yTestB[index]),
      yTestC: JSON.stringify(data.yTestC[index]),
    })))
  }

  const TrainAColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTrainA',
    },
    {
      name: 'Pembobotan',
      selector: 'xTrainA',
    },
    {
      name: 'class',
      selector: 'yTrainA',
    }
  ]
  const TestAColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTestA',
    },
    {
      name: 'Pembobotan',
      selector: 'xTestA',
    },
    {
      name: 'class',
      selector: 'yTestA',
    }
  ]

  const TrainBColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTrainB',
    },
    {
      name: 'Pembobotan',
      selector: 'xTrainB',
    },
    {
      name: 'class',
      selector: 'yTrainB',
    }
  ]
  const TestBColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTestB',
    },
    {
      name: 'Pembobotan',
      selector: 'xTestB',
    },
    {
      name: 'Class',
      selector: 'yTestB',
    }
  ]

  const TrainCColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTrainC',
    },
    {
      name: 'Pembobotan',
      selector: 'xTrainC',
    },
    {
      name: 'Class',
      selector: 'yTrainC',
    }
  ]
  const TestCColumns = [
    {
      name: 'No',
      cell: (row, index) => index + 1,
    },
    {
      name: 'Tweet Bersih',
      selector: 'tweetTestC',
    },
    {
      name: 'Pembobotan',
      selector: 'xTestC',
    },
    {
      name: 'Class',
      selector: 'yTestC',
    }
  ]

  return (
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
  )
}