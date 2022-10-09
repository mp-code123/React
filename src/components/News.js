import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitilizeLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const updateNews = async () => {
        props.setProgress(0)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&page=${page}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(40)
        let parsedData = await data.json()
        props.setProgress(80)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)

    }
    useEffect(() => {
        document.title = `${capitilizeLetter(props.category)}`
        updateNews()

    }, [])


    const handlePrevClick = async () => {
        setPage(page - 1 )
        updateNews()
    }

    const handleNextClick = async () => {
        setPage(page + 1 )
        updateNews()
    }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&page=${page+1}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`
        setPage(page + 1)
        // setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)

    };

    return (
        <>
            <h2 className="text-center" style={{margin: '35px 0px' ,marginTop: '90px'}}>Top headlines</h2>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">

                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title} description={element.description}
                                    imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

        </>
    )
}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
}
export default News