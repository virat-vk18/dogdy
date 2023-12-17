import React, { useEffect, useState } from 'react'
import { useGetSellDogsMutation } from '../nftListApi'
import noData from '../../../../assets/images/NoData/No data-cuate.png'
const OnSell = () => {
  const [SellDogs, setSellDogs] = useState([])
  const [getSellDogs] = useGetSellDogsMutation()

  useEffect(() => {
    const handleGetDogs = async () => {
      try {
        const response = await getSellDogs()
        //Get Dogs
        const allDogs = response.data.data
        setSellDogs(allDogs)
      } catch (err) {
        console.log(err.message)
      }
    }
    handleGetDogs()
  }, [])
  // let content
  // try {
  //   if (isLoading) {
  //     content = (
  //       <div className="f20 text-yellow fw-400  text-uppercase dpuff">On Sell is Loading</div>
  //     )
  //   } else if (isSuccess) {
  //     const getData = getDogs.data

  //     content = (
  //       <div className="row row-cols-1 row-cols-sm-4 g-3">
  //         {getData.map((item) => (
  //           <div
  //             //   onClick={() => navigate(`/market-place-details/${item._id}`)}
  //             className="col"
  //             key={item._id}
  //           >
  //             <div className="card">
  //               <img
  //                 src={`http://localhost:3991/${item.nftImage}`}
  //                 className="card-img-top"
  //                 alt="Fissure in Sandstone"
  //               />
  //               <div className="card-body">
  //                 <h5 className="card-title">#1328</h5>
  //                 <h5 className="mb-0">
  //                   {item.sellprice}
  //                   <span>MATIC</span>
  //                 </h5>
  //                 <p className="card-text">{item.gender}</p>
  //                 <h4 className="mb-0">#1328</h4>

  //                 <a href="#!" className="btn btn-primary" data-mdb-ripple-init>
  //                   Button
  //                 </a>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     )
  //   } else {
  //     content = <p className="text-white text-center">{error.message}</p>
  //   }
  // } catch (err) {
  //   console.error(err.message)
  // }
  return (
    <div>
      {SellDogs.length > 0 ? (
        <>
          {SellDogs.map((item) => (
            <div
              //   onClick={() => navigate(`/market-place-details/${item._id}`)}
              className="col"
              key={item._id}
            >
              <div className="card">
                <img
                  src={`http://localhost:3991/${item.nftImage}`}
                  className="card-img-top"
                  alt="Fissure in Sandstone"
                />
                <div className="card-body">
                  <h5 className="card-title">#1328</h5>
                  <h5 className="mb-0">
                    {item.sellprice}
                    <span>MATIC</span>
                  </h5>
                  <p className="card-text">{item.gender}</p>
                  <h4 className="mb-0">#1328</h4>

                  <a href="#!" className="btn btn-primary" data-mdb-ripple-init>
                    Button
                  </a>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <img src={noData} alt="No data" className="img-fluid" />
      )}
    </div>
  )
}

export default OnSell
