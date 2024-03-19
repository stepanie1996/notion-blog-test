import { useEffect } from 'react'
import BLOG from '@/blog.config'
import { EyeIcon, WifiIcon } from '@/Icon/Icon'
import React from 'react'

var umiId = BLOG.analytics.umamiConfig.websiteId

const UmamiData = () => {
  
  useEffect(() => {
    function umiTongji() {
      const apiU=BLOG.analytics.umamiConfig.apiUrl
      var umiToken = BLOG.analytics.umamiConfig.token
      var umiTime = Date.parse(new Date());
      var umiUrl = apiU+umiId+"/stats?startAt=1672848000000&endAt="+umiTime;
      var umiUrl2 = apiU+umiId+"/active";

      fetch(umiUrl, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + umiToken,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(resdata => {
        var demo = document.getElementById('pvstatic');
        if (demo) {
          demo.innerHTML = resdata.pageviews.value;
        }
      });

      fetch(umiUrl2, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + umiToken,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(resdata => {
        console.log('在线人数',resdata)
        var demo = document.getElementById('online');
        if (demo) {
          demo.innerHTML = resdata.x+1;
        }
      });

    }

    umiTongji();
  }, []);
  return (<div className=' p-2 mb-3 flex space-x-1 w-full bg-gray-700 dark:bg-gray-800 rounded-xl h-full justify-center flex-row content-center items-center hover:shadow-[0_0_30px_10px_rgba(0,255,0,0.5)] duration-300 hover:bg-day hover:dark:bg-night
  hover:ring-1 hover:ring-green-400  dark:hover:ring-green-400 '>
    <div className="   flex justify-center text-center flex-row content-center items-center  ">
      <WifiIcon className=' h-8 inline-block text-green-400   ' />
      <span id="online" className='online inline-block text-green-400 '></span>
    </div>
    <EyeIcon className=' h-8  ' />
    <span id="pvstatic"></span>
</div>
  )
}
export default UmamiData
