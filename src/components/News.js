import React,{useEffect, useState}from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]); // Ensure it's initialized as an array
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const UpdateNews = async () => {
    try {
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0d0c7316845e4f1bb3922fd58689bc21&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedata = await data.json();
      props.setProgress(70);

      // Validate parsedata.articles before setting state
      setArticles(parsedata.articles || []);
      setLoading(false);
      setTotalResults(parsedata.totalResults || 0);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false); // Stop loading in case of error
    }
  };

  useEffect(() => {
    UpdateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0d0c7316845e4f1bb3922fd58689bc21&page=${page + 1}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedata = await data.json();

      setArticles(articles.concat(parsedata.articles || []));
      setTotalResults(parsedata.totalResults || 0);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        NewsMonkey - Top {capitalize(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length} // Use articles.length safely
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row g-3">
            {articles.map((element, index) => (
              <div className="col-md-4" key={element.url || index}>
                <NewsItems
                  title={element.title?.slice(0, 45) || "No Title"}
                  description={element.description?.slice(0, 88) || "No Description"}
                  imageUrl={
                    element.urlToImage ||
                    "https://via.placeholder.com/150?text=No+Image"
                  }
                  newsurl={element.url}
                  author={element.author || "Unknown"}
                  date={element.publishedAt || "Unknown Date"}
                  source={element.source?.name || "Unknown Source"}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

   News.defaultProps = {
     country: "in",
     pageSize: 6,     category : 'general',
   };

   News.propTypes = {
     country: PropTypes.string,  
     pageSize: PropTypes.number,
     catgory : PropTypes.string,

   }
 export default News;



// document.title = `${this.capitalize(props.category)} - NewsMonkey`;
// const News=(props)=> {
//   const [articles, setArticles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [page, setPage] = useState(1)
//   const [totalResults, setTotalResults]= useState(0)

 
//   const capitalize = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

//     const UpdateNews =async()=>{
//       props.setProgress(10);
//       const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}
//       &apiKey=0d0c7316845e4f1bb3922fd58689bc21&page=${page}&pageSize=${props.pageSize}`;
//       setLoading(true)
//       let data = await fetch(url);
//       props.setProgress(30);
//       let parsedata = await data.json()
//       props.setProgress(70);
//       setArticles(parsedata.articles)
//       setLoading(false)
//       setTotalResults(parsedata.totalResults)
//       // console.log(parsedata);  
    
//         props.setProgress(100);
//     }

//     useEffect(()=>{
       
//       UpdateNews();
//     },[])

//     const HandlePreviousClick = async() =>{
//       console.log("previous")
//       // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0d0c7316845e4f1bb3922fd58689bc21&page=${this.state.page-1}&pageSize=${props.pageSize}`;
//       // this.setState({loading : true});
//       // let data = await fetch(url);
//       // let parsedata = await data.json() 
//       // this.setState({
//       //   page : this.state.page - 1,
//       //   articles: parsedata.articles || [],
//       //   loading : false
//       setPage(page-1)
//       UpdateNews();
//       // })

//     }

//     const HandleNextClick = async() =>{
//       console.log("next")
//     //   if(!(this.state.page + 1 > Math.ceil (this.state.totalResults/props.pageSize))){
//     //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0d0c7316845e4f1bb3922fd58689bc21&page=${this.state.page+1}&pageSize=${props.pageSize}`;
//     //   this.setState({loading : true});
//     //   let data = await fetch(url);
//     //   let parsedata = await data.json()
//     //   this.setState({
//     //     page : this.state.page + 1,
//     //     articles: parsedata.articles || [],
//     //     loading : false
//     //     // articles: parsedata.articles 
    
//     setPage(page+1)
//     this.UpdateNews();
//     //   })
//      }

//      const fetchMoreData = async() => {
//       setPage(page+1)
//       const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}
//       &apiKey=0d0c7316845e4f1bb3922fd58689bc21&page=${page}&pageSize=${props.pageSize}`;
//       let data = await fetch(url);
//       let parsedata = await data.json()
//       setArticles(articles.concat(parsedata.articles))  
//       setTotalResults(parsedata.totalResults)

//        }
   
     
//       return (
//         <>
//             <h1 className='text-center' style={{margin : '35px 0px',marginTop:'90px'}}>NewsMonkey- Top {capitalize(props.category)} Headlines</h1>
//             {loading && <Spinner/>} 
//             <InfiniteScroll
//                   dataLength={articles.length}
//                   next={fetchMoreData}
//                   hasMore={articles.length !== totalResults}
//                   loader={<Spinner/>}
//               >
//                 <div className='container'>
//                   <div className='row g-3'>
//                       {articles.map((element) =>{
//                         return <div className='col-md-4'key={element.url} >
//                           <NewsItems title={element.title?.slice(0, 45) || "No Title"}
//                           description={element.description?.slice(0, 88) || "No Description"} 
//                           imageUrl={element.urlToImage ||"https://s.yimg.com/ny/api/res/1.2/m48.hQ0n05CGnlG4MTB.Ag--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/motleyfool.com/ca58eb8d37bfc4089436c02ee683fdc1"} 
//                           newsurl={element.url} 
//                           author={element.author} 
//                           date={element.publishedAt}
//                           source = {element.source.name}/>
//                           </div>
//                       })}
//                   </div>
//                 </div>
//               </InfiniteScroll>
//        </>
//       )
//   }





//   News.defaultProps = {
//     country: "in",
//     pageSize: 6,
//     category : 'general',
//   };

//   News.propTypes = {
//     country: PropTypes.string,  
//     pageSize: PropTypes.number,
//     catgory : PropTypes.string,

//   }


// export default News;


// https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=df363f680b134fcb84ce670cf3ec8b27


 // Show spinner while loading
//  if (loading) {
//   return (
//    <div
//      style={{
//        display: "flex",
//        justifyContent: "center",
//        alignItems: "center",
//        height: "80vh", // Make it cover the full viewport height
//        width: "80vw", // Optional: Make it cover the full viewport width
//      }}
//    >
//      <div style={{ textAlign: "center" }}> {/* Added textAlign to center text */}
//        <Spinner />
//        <p>Loading, please wait...</p>
//      </div>
//    </div>
//  );
// }


// if (error) {
//  return <div style={{ color: "red" }}>Error: {error}</div>;
// }
