import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import Recipes from "../components/Recipe/Recipes";
import Subscribe from "../components/Subscribe/Subscribe";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import Title from "../components/UI/Title";

function ContactPage() {
  const [enteredName, setEnteredName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [enteredSubject, setEnteredSubject] = useState("");
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [enteredMessage, setEnteredMessage] = useState("");
  const [messageTouched, setMessageTouched] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState("Advertising");

  let nameIsValid = true;
  if (enteredName?.trim() === "") {
    nameIsValid = false;
  }

  let emailIsValid = true;
  if (!/^\S+@\S+\.\S+$/.test(enteredEmail!)) {
    emailIsValid = false;
  }
  let subjectIsValid = true;
  if (enteredSubject?.trim() === "") {
    subjectIsValid = false;
  }
  let messageIsValid = true;
  if (enteredMessage?.trim() === "") {
    messageIsValid = false;
  }
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const validClasses =
    "border p-5 rounded-2xl h-full text-sm mb-6 text-black/60 border-gray-900/10 bg-transparent";
  const errorClasses =
    "border p-5 rounded-2xl h-full text-sm mb-6 text-black/60 border-red-600 bg-red-300/10";
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
            <label
              className="text-xs font-medium mb-3 tracking-wide opacity-80 uppercase"
              htmlFor="name"
            >
              name
            </label>
            <input
              onChange={(e) => setEnteredName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              className={
                !nameIsValid && nameTouched ? errorClasses : validClasses
              }
              type="text"
              id="name"
              placeholder="Enter your name..."
            />
          </div>
          <div className="flex flex-col font-inter ">
            <label
              className="text-xs font-medium mb-3 tracking-wide opacity-80 uppercase"
              htmlFor="email"
            >
              email
            </label>
            <input
              onChange={(e) => setEnteredEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              className={
                !emailIsValid && emailTouched ? errorClasses : validClasses
              }
              type="email"
              id="email"
              placeholder="Your email address"
            />
          </div>
          <div className="flex flex-col font-inter ">
            <label
              className="text-xs font-medium mb-3 tracking-wide opacity-80"
              htmlFor="subject"
            >
              subject
            </label>
            <input
              onChange={(e) => setEnteredSubject(e.target.value)}
              onBlur={() => setSubjectTouched(true)}
              className={
                !subjectIsValid && subjectTouched ? errorClasses : validClasses
              }
              type="text"
              id="subject"
              placeholder="enter subject"
            />
          </div>
          <div>
            <label
              className="inline-block text-xs font-medium tracking-wide opacity-80 mb-2"
              htmlFor="select"
            >
              enquiry type
            </label>
            <select
              className="border border-gray-900/10 p-5 rounded-2xl text-sm  mb-6 w-full text-black/60"
              id="enquiry"
              onChange={(e) => setSelectedEnquiry(e.target.value)}
              value={selectedEnquiry}
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
            <label
              className="text-xs font-medium mb-3 tracking-wide opacity-80"
              htmlFor="message"
            >
              message
            </label>
            <textarea
              onChange={(e) => setEnteredMessage(e.target.value)}
              onBlur={() => setMessageTouched(true)}
              className={
                !messageIsValid && messageTouched ? errorClasses : validClasses
              }
              id="message"
              placeholder="Enter your message..."
            />
          </div>
          <Button className="w-full sm:w-36 md:w-[180px] h-12 md:h-[60px]">
            Submit
          </Button>
        </form>
      </div>
      <Subscribe />
      <div className="mt-16 md:mt-32">
        <Title className="mb-16">you may like these recipes</Title>
        <Recipes len={4} />
      </div>
    </Container>
  );
}

export default ContactPage;
