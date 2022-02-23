import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function App() {
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=21`
      );
      const data = await res.json();
      const total = res.headers.get('x-total-count');
      setpageCount(Math.ceil(total/21));
      // console.log(Math.ceil(total/21));
      setItems(data);
    };

    getComments();
  }, []);

  // console.log(items);


  const fetchComments = async (currentpage) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${currentpage}&_limit=21`
    );
    const data = await res.json();
    return(data);
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentpage = data.selected +1;

    const commentsFormServer = await fetchComments(currentpage);
    setItems(commentsFormServer);

  };

  return (
    <div className="container">
    <div className="row m-2">
      {items.map((items) => {
        return (
          <div key={items.id} className="col-6 col-md-4 vmy-2">
            <div className="card shadow w-100" style={{ minHeight: 255 }}>
              <div className="card-body">
                <h5 className="card-title text-center h2">Id:{items.id}</h5>
                <h6 className="card-subtitle mb-2 text-muted text-center">
                  {items.email}
                </h6>
                <p className="card-text">{items.body}</p>
              </div>
            </div>
          </div>
        );
      })};
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"......"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplaye={1}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
