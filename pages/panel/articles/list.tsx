import Article from "@/components/Article/Article";
import { deleteArticle, getArticles } from "@/services/articlesApi";
import { errorMessage, successMessage } from "@/utils/toastMessages";
import { useMutation, useQuery, useQueryClient } from "react-query";

function ArticlesListPage() {
  const { data: articlesData } = useQuery(["articles"], () => getArticles());
  const articles = articlesData?.data ?? [];
  const totalArticles = articlesData?.total ?? 0;
  const queryClient = useQueryClient();

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
      <div className=" bg-white flex flex-col gap-8 font-inter p-4 sm:p-8 rounded ">
        {articles.map((article) => (
          <Article key={article._id} article={article} removeHandler={removeHandler} />
        ))}
      </div>
    </section>
  );
}

export default ArticlesListPage;
