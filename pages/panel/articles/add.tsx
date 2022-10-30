import ArticleDetailsForm from "@/components/Panel/Articles/ArticleDetailsForm";
import { useMutation, useQueryClient } from "react-query";
import { addArticle } from "@/services/articlesApi";
import { IArticle } from "@/types/index";
import { errorMessage, successMessage } from "@/utils/toastMessages";
import { useRouter } from "next/router";

function AddArticlePage() {
  const router = useRouter();

  const queryClient = useQueryClient();
  const addArticleMutation = useMutation(addArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
      successMessage("Article created successfully.");
      router.push("/panel/articles/list");
    },
    onError: (error: Error) => {
      errorMessage(error.message);
    },
  });

  const sendData = (newArticle: IArticle) => {
    addArticleMutation.mutate(newArticle);
  };
  return (
    <section className="p-4 sm:p-8 max-w-7xl xl:mx-auto">
      <div className="font-inter bg-white  rounded  text-[#212529] ">
        <div className="p-4 border-b border-gray-100 ">
          <h1 className="font-semibold">ADD ARTICLE FORM</h1>
        </div>
        <ArticleDetailsForm sendData={sendData} />
      </div>
    </section>
  );
}

export default AddArticlePage;
