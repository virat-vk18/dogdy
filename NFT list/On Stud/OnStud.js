import React from 'react'
import { useGetStudDogsQuery } from '../nftListApi'

const OnStud = () => {
  const { data: getDogs, isLoading, error, isSuccess } = useGetStudDogsQuery()
  let content
  try {
    if (isLoading) {
      content = (
        <div className="f20 text-yellow fw-400  text-uppercase dpuff">On Stud is Loading</div>
      )
    } else if (isSuccess) {
      const getData = getDogs.allDogs
      content = (
        <div className="row row-cols-1 row-cols-sm-4 g-3">
          {getData.map((item) => (
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
        </div>
      )
    } else {
      content = <p className="text-white text-center">{error.message}</p>
    }
  } catch (err) {
    console.error(err.message)
  }
  return <div>{content}</div>
}

export default OnStud
