import React from 'react'

const  NewsItems =(props)=> {
    let {title,description,imageUrl,newsurl,author,date,source} = props;
    return (
      <div>
       <div className="card">
        <div style={{display:'felx',justifyContent:'flex-end',postion:'absoulte',right:'0'}}>
        <span className="badge rounded-pill bg-danger"> {source}</span>
        </div>
            <img src={imageUrl || "https://gizmodo.com/app/uploads/2024/11/pixel-9-pro.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className='card-text'><small className='text-muted'> By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a rel='noreffer' href={newsurl} className="btn btn-sm btn-dark">Read more..</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItems;
