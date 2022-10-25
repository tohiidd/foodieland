import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import dbConnect from "@/services/dbConnect";
import Article from "@/components/Article/Article";
import Pagination from "@/components/Pagination/Pagination";
import RecipeList from "@/components/Recipe/RecipeList";
import SearchBar from "@/components/SearchBar/SearchBar";
import Subscribe from "@/components/Subscribe/Subscribe";
import Container from "@/components/UI/Container";
import Subtitle from "@/components/UI/Subtitle";
import Title from "@/components/UI/Title";
import ArticleModel from "@/models/Article";
import { IArticle } from "@/types/index";
import { addFilters } from "@/utils/addFilters";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import { getArticles } from "@/services/articlesApi";
import { stringify } from "@/utils/stringify";

interface Props {
  articlesList: IArticle[];
  totalArticles: number;
}

function BlogPage({ articlesList, totalArticles }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);
  const queryClient = useQueryClient();

  const router = useRouter();

  let queries = `page=${currentPage}&limit=${articlesPerPage}`;

  let searchQuery = router.query.search as string;
  if (searchQuery) {
    queries = `${queries}&search=${searchQuery}`;
  }

  const { data: articlesData } = useQuery(["articles"], () => getArticles(queries), {
    initialData: { data: articlesList, total: totalArticles },
    refetchOnMount: false,
  });
  const articles = articlesData?.data ?? [];
  const total = articlesData?.total ?? 0;

  useEffect(() => {
    queryClient.prefetchQuery(["articles"], () => getArticles(queries));
  }, [router.query, queries, queryClient]);

  return (
    <Container className="mt-16 mb-32">
      <div className="mb-14">
        <Title className=" xl:text-6xl mb-[24px]">Blog & Article</Title>
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        </Subtitle>
      </div>
      <SearchBar placeholder={"search articles, news..."} />
      <section className=" flex flex-wrap lg:flex-nowrap gap-10 font-inter mt-10 mb-5 lg:mt-20 lg:mb-8">
        <div className=" basis-[100%] lg:basis-[66%] relative ">
          {articles.map((article) => (
            <Article key={article._id} article={article} />
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
        <RecipeList title="tasty recipes" banner />
      </section>
      <div className="w-full hidden lg:block">
        {total / articlesPerPage > 1 && (
          <Pagination
            postPerPage={articlesPerPage}
            totalPosts={total}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await dbConnect();
  let filters = addFilters(context.query);
  const articlesList = await ArticleModel.find(filters);
  const totalArticles = await ArticleModel.countDocuments(filters);

  return {
    props: {
      articlesList: stringify(articlesList),
      totalArticles,
    },
  };
}
