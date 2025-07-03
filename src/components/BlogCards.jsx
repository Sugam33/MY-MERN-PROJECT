import React, { useEffect, useState } from 'react'
import Burger1 from '../assets/burger1.jpg';
import Burger2 from '../assets/burger2.jpg';
import Burger3 from '../assets/burger3.jpg';
import Burger4 from '../assets/burger4.jpg';

const BlogCards = () => {
    const Blogs = [
        {
            id: 1,
            title: "Blog 1",
            description: "This is the first blog post",
            image: Burger1
        },
        {
            id: 2,
            title: "Blog 2",
            description: "This is the second blog post",
            image: Burger2
        },
        {
            id: 3,
            title: "Blog 3",
            description: "This is the third blog post",
            image: Burger3
        },
        {
            id: 4,
            title: "Blog 4",
            description: "This is the fourth blog post",
            image: Burger4
        }
    ];

    const [data, setData] = useState([]);
    const [news, setNews] = useState([]);

    const fetchData = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const data = await response.json();
            // console.log(data);
            setData(data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const fetchNews = async () => {
      const newsResponse = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=28fef8b305c84136976b4f04afc1f2d5');
      const newsData = await newsResponse.json();
      console.log(newsData.articles);
      setNews(newsData.articles);
    }

    useEffect(() => {
      fetchNews();
    }, [])

  return (
    <div className='blogs-section'>
    <div className="container">
      <div className="row">
        <h4>{data.title}</h4>
        <h4>Our latest Blogs</h4>
        {
          Blogs.map((item) => {
            return (
              <div className="col-md-3">
                <div className="card">
                  <img src={item.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

       <div className="container mt-4">
      <h2 className="text-center mb-4 newsblog-header">Latest News</h2>
      <div className="row">
        {news.map((article) => (
          <div className="col-md-4 mb-4">
            <div className="card news-card shadow-lg border-0">
                <img src={article.urlToImage} className="news-img" alt="News Thumbnail" />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.description}
                </p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
}

export default BlogCards
