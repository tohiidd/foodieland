import { ChangeEvent, useState } from "react";
import Article from "../../components/Article/Article";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
import Container from "../../components/UI/Container";
import Subtitle from "../../components/UI/Subtitle";
import Title from "../../components/UI/Title";
import { articleData } from "../../services/data/article";

function Blog() {
  const [articles, setArticles] = useState(articleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let keyword = event?.target.value;
    let data = articleData.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLocaleLowerCase())
    );
    setArticles(data);
  };
  return (
    <Container className="mt-16 mb-32">
      <div className="mb-14">
        <Title className=" mb-[24px]">Blog & Article</Title>
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore
        </Subtitle>
      </div>
      <SearchBar
        searchHandler={searchHandler}
        placeholder={"search articles, news..."}
      />
      <section className="w-11/12 xl:w-full mx-auto flex flex-wrap lg:flex-nowrap gap-10 font-inter my-10 lg:my-20">
        <div className=" basis-[100%] lg:basis-[66%] relative ">
          {currentArticles.map((article) => (
            <Article
              key={article.id}
              id={article.id}
              title={article.title}
              description={article.description}
              img={article.img}
              createdAt={article.createdAt}
              author={article.author}
              profile={article.profile}
            />
          ))}
        </div>
        <div className="w-auto">
          {currentArticles.length / articlesPerPage > 1 && (
            <Pagination
              postPerPage={articlesPerPage}
              totalPosts={currentArticles.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </section>
    </Container>
  );
}

export default Blog;
