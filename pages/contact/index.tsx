import { FormEvent, ChangeEvent, useState } from "react";
import Image from "next/image";
import Recipes from "@/components/Recipe/Recipes";
import Subscribe from "@/components/Subscribe/Subscribe";
import Button from "@/components/UI/Button";
import Container from "@/components/UI/Container";
import Title from "@/components/UI/Title";
import { useMutation, useQuery } from "react-query";
import { addMessage } from "@/services/messagesApi";
import { errorMessage, successMessage } from "@/utils/toastMessages";
import { IMessage } from "@/types/index";

const initialState: IMessage = { name: "", email: "", subject: "", enquiry: "advertising", message: "" };
function ContactPage() {
  const [inputs, setInputs] = useState(initialState);
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [messageTouched, setMessageTouched] = useState(false);

  const addMessageMutation = useMutation(addMessage, {
    onSuccess: () => {
      successMessage("Message submitted successfully!");
      setInputs(initialState);
      setNameTouched(false);
      setEmailTouched(false);
      setSubjectTouched(false);
      setMessageTouched(false);
    },
    onError: (error: Error) => {
      errorMessage(error.message);
    },
  });
  let nameIsValid = true;
  if (inputs.name?.trim() === "") {
    nameIsValid = false;
  }
  let emailIsValid = true;
  if (!/^\S+@\S+\.\S+$/.test(inputs.email)) {
    emailIsValid = false;
  }
  let subjectIsValid = true;
  if (inputs.subject?.trim() === "") {
    subjectIsValid = false;
  }
  let messageIsValid = true;
  if (inputs.message?.trim() === "") {
    messageIsValid = false;
  }

  type Input = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  const addInputValueHandler = (event: ChangeEvent<Input>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!nameIsValid || !emailIsValid || !subjectIsValid || !messageIsValid) return;

    const message = {
      name: inputs.name,
      email: inputs.email,
      subject: inputs.subject,
      enquiry: inputs.enquiry,
      message: inputs.message,
    };
    addMessageMutation.mutate(message);
  };

  const validClasses = "border p-5 rounded-2xl h-full text-sm mb-6 text-black/60 border-gray-900/10 bg-transparent";
  const errorClasses = "border p-5 rounded-2xl h-full text-sm mb-6 text-black/60 border-red-600 bg-red-300/10";
  return (
    <Container>
      <div className="flex justify-center lg:grid lg:grid-cols-3 w-full my-14  md:my-20">
        <Title className="xl:text-6xl col-start-2">Contact us</Title>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3 mb-16 lg:mb-36">
        <div className="w-1/2 mb-4 mx-auto lg:w-full">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/foodieland-3b1ed.appspot.com/o/cooker%2FCook-contact.png?alt=media&token=6d41b736-1b6c-4929-9b2e-fd6319ebfa2b"
            alt="Cook"
            width={200}
            height={250}
            layout="responsive"
            className="mb-16 justify-self-center self-center lg:h-5/6 ml-3"
          />
        </div>
        <form
          onSubmit={onSubmit}
          className=" flex flex-col px-2  lg:grid lg:grid-cols-2 lg:grid-rows-4 gap-x-10 lg:col-span-2 lg:px-5  "
        >
          <div className="flex flex-col font-inter ">
            <label className="text-xs font-medium mb-3 tracking-wide opacity-80 uppercase" htmlFor="name">
              name
            </label>
            <input
              onChange={addInputValueHandler}
              className={!nameIsValid && nameTouched ? errorClasses : validClasses}
              onBlur={() => setNameTouched(true)}
              value={inputs.name}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name..."
            />
          </div>
          <div className="flex flex-col font-inter ">
            <label className="text-xs font-medium mb-3 tracking-wide opacity-80 uppercase" htmlFor="email">
              email
            </label>
            <input
              onChange={addInputValueHandler}
              className={!emailIsValid && emailTouched ? errorClasses : validClasses}
              onBlur={() => setEmailTouched(true)}
              value={inputs.email}
              type="email"
              id="email"
              name="email"
              placeholder="Your email address"
            />
          </div>
          <div className="flex flex-col font-inter ">
            <label className="text-xs font-medium mb-3 tracking-wide opacity-80" htmlFor="subject">
              subject
            </label>
            <input
              onChange={addInputValueHandler}
              className={!subjectIsValid && subjectTouched ? errorClasses : validClasses}
              onBlur={() => setSubjectTouched(true)}
              value={inputs.subject}
              type="text"
              id="subject"
              name="subject"
              placeholder="enter subject"
            />
          </div>
          <div>
            <label className="inline-block text-xs font-medium tracking-wide opacity-80 mb-2" htmlFor="select">
              enquiry type
            </label>
            <select
              className="border border-gray-900/10 p-5 rounded-2xl text-sm  mb-6 w-full text-black/60"
              id="enquiry"
              onChange={addInputValueHandler}
              value={inputs.enquiry}
              name="enquiry"
            >
              <option className="text-black" value="advertising">
                Advertising
              </option>
              <option className="text-black" value="commercials">
                Commercials
              </option>
              <option className="text-black" value="support">
                Support
              </option>
            </select>
          </div>
          <div className="flex flex-col font-inter col-span-2 row-span-2">
            <label className="text-xs font-medium mb-3 tracking-wide opacity-80" htmlFor="message">
              message
            </label>
            <textarea
              onChange={addInputValueHandler}
              className={!messageIsValid && messageTouched ? errorClasses : validClasses}
              onBlur={() => setMessageTouched(true)}
              value={inputs.message}
              id="message"
              name="message"
              placeholder="Enter your message..."
            />
          </div>
          <Button className="w-full sm:w-36 md:w-[180px] h-12 md:h-[60px]">Submit</Button>
        </form>
      </div>
      <Subscribe />
      <div className="mt-16 md:mt-32">
        <Title className="mb-16 capitalize">you may like these recipes too</Title>
        <Recipes len={4} />
      </div>
    </Container>
  );
}

export default ContactPage;
