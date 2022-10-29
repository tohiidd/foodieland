import { useState } from "react";
import Article from "@/components/Article/Article";
import { deleteArticle, getArticles } from "@/services/articlesApi";
import { errorMessage, successMessage } from "@/utils/toastMessages";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Pagination from "@/components/Pagination/Pagination";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

function ArticlesListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);
  const queryClient = useQueryClient();

  let queries = `page=${currentPage}&limit=${articlesPerPage}`;

  const { data: articlesData } = useQuery(["articles", queries], () => getArticles(queries));
  const articles = articlesData?.data ?? [];
  const total = articlesData?.total ?? 0;

  const deleteArticleMutation = useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
      successMessage("Article deleted.");
    },
    onError: (error: Error) => {
      errorMessage(error.message);
    },
  });

  const removeHandler = (id: string) => {
    deleteArticleMutation.mutate(id);
  };

  return (
    <section className="p-4 sm:p-12 max-w-7xl xl:mx-auto">
      <div className=" flex flex-col gap-8 font-inter p-4 sm:p-8 rounded ">
        {articles.map((article) => (
          <Article key={article._id} article={article} removeHandler={removeHandler} />
        ))}
      </div>
      <div className="w-auto">
        {total / articlesPerPage > 1 && (
          <Pagination
            postPerPage={articlesPerPage}
            totalPosts={total}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}

export default ArticlesListPage;
