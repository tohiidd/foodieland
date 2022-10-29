import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import ArticleDetailsForm from "@/components/Panel/Articles/ArticleDetailsForm";
import { updateArticle } from "@/services/articlesApi";
import { IArticle } from "@/types/index";
import { errorMessage, successMessage } from "@/utils/toastMessages";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

function EditArticlePage() {
  const router = useRouter();

  const queryClient = useQueryClient();
  const editArticleMutation = useMutation(updateArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
      successMessage("Article updated successfully.");
      router.push("/panel/articles/list");
    },
    onError: (error: Error) => {
      errorMessage(error.message);
    },
  });

  const sendData = (newArticle: IArticle) => {
    editArticleMutation.mutate(newArticle);
  };
  return (
    <section className="p-4 sm:p-8 max-w-7xl xl:mx-auto">
      <div className="font-inter bg-white  rounded  text-[#212529] ">
        <div className="p-4 border-b border-gray-100 ">
          <h1 className="font-semibold">EDIT ARTICLE FORM</h1>
        </div>
        <ArticleDetailsForm sendData={sendData} />
      </div>
    </section>
  );
}

export default EditArticlePage;
