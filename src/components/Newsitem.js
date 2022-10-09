import React from 'react'

const Newsitem = (props) => {

  let { title, description, imgUrl, newsUrl, author, date, source } = props

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={imgUrl} className='card-img' alt="..." />
        <div className="card-body">
          <h4 className="card-title">{title}
            <span style={{ left: '90%', zIndex: '1', fontSize: '10px' }} className="position-absolute top-0 start-60 translate-middle badge rounded-pill bg-danger">
              {source.name}
            </span>
          </h4>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
          <a rel="noreferral" href={newsUrl} className='btn btn-sm btn-primary' target="_blank">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default Newsitem