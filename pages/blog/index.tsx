import { ChangeEvent, useState } from "react";
import Article from "../../components/Article/Article";
import Pagination from "../../components/Pagination/Pagination";
import RecipeList from "../../components/Recipe/RecipeList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Subscribe from "../../components/Subscribe/Subscribe";
import Container from "../../components/UI/Container";
import Subtitle from "../../components/UI/Subtitle";
import Title from "../../components/UI/Title";
import { articleData } from "../../services/data/article";
import { recipes } from "../../services/data/recipeData";

function BlogPage() {
  const [articles, setArticles] = useState(articleData);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

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
        <Title className=" xl:text-6xl mb-[24px]">Blog & Article</Title>
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore
        </Subtitle>
      </div>
      <SearchBar
        searchHandler={searchHandler}
        placeholder={"search articles, news..."}
      />
      <section className=" flex flex-wrap lg:flex-nowrap gap-10 font-inter mt-10 mb-5 lg:mt-20 lg:mb-8">
        <div className=" basis-[100%] lg:basis-[66%] relative ">
          {articles
            .slice(indexOfFirstArticle, indexOfLastArticle)
            .map((article) => (
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
        <div className="w-full lg:hidden">
          {articles.length / articlesPerPage > 1 && (
            <Pagination
              postPerPage={articlesPerPage}
              totalPosts={articles.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
        <RecipeList title="tasty recipes" recipes={recipes} banner />
      </section>
      <div className="w-full hidden lg:block">
        {articles.length / articlesPerPage > 1 && (
          <Pagination
            postPerPage={articlesPerPage}
            totalPosts={articles.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      <Subscribe />
    </Container>
  );
}

export default BlogPage;
