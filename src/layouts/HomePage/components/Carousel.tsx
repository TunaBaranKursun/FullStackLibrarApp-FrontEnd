import { ReturnBook } from "./ReturnBook";
import {useEffect, useState} from "react";
import BookModel from "../../../models/BookModel";
import { error } from "console";


export const Carousel = () => {

  const[books , setBooks] =useState<BookModel[]>([]);
  const[isLoading,setIsLoading] =useState(true);
  const[httpError,setHttpError]=useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = "http://localhost:8081/api/books"

      const url:string = `${baseUrl}?page=0&size=9`;

      const response = await fetch(url);

      if(!response.ok){
        throw new Error("Something went wrong!");
      }

      const responceJson = await response.json();

      const responceData = responceJson._embedded.books;

      const loadedBooks : BookModel[] = [];

      for(const key in responceData){
        loadedBooks.push({
          id:responceData[key].id,
          title:responceData[key].title,
          author:responceData[key].author,
          description:responceData[key].description,
          copies:responceData[key].copies,
          copiesAvailable:responceData[key].copiesAvailable,
          category:responceData[key].category,
          img:responceData[key].img,
        });

      }
      
      setBooks(loadedBooks);
      setIsLoading(false);
    }
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  },[]);

  if(isLoading){
    return(
      <div className="container m-5">
        <p>Loading..</p>
      </div>
    )
  }

  if(httpError){
    return(
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    )
  }
  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dak slide mt-5
             d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* DESKTOP */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {books.slice(0,3).map(book => (
                <ReturnBook book = {book} key= {book.id}/>
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
            {books.slice(3,6).map(book => (
                <ReturnBook book = {book} key= {book.id}/>
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
            {books.slice(6,9).map(book => (
                <ReturnBook book = {book} key= {book.id}/>
              ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* MOBILE */}

      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
              <ReturnBook book = {books[7]} key={books[7].id}/>
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <a className="btn bt-outline-secondary btn-lg" href="#"></a>
      </div>
    </div>
  );
};
