import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const ContactMe = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(loading);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!senderName || !subject || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);
    await axios
      .post(
        "http://localhost:1700/api/v1/message/send",
        {
          senderName,
          subject,
          message,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setSenderName("");
        setSubject("");
        setMessage("");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="relative mb-12">
          <h1
            className="flex gap-4 items-center text-[2rem] sm:[2.75rem] md:text-[3rem] ;g:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-bold "
            style={{ background: "hsl(222.2 84% 4.9%" }}
          >
            Contact
          </h1>
          <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
        </div>

        <form onSubmit={handleSendMessage} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 px-1.5">
            <Label className="text-xl">Your Name</Label>
            <Input
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Enter your name"
              className="p-2 bg-transparent border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2 px-1.5">
            <Label className="text-xl">Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Your Subject"
              className="p-2 bg-transparent border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2 px-1.5">
            <Label className="text-xl">Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write Your Message..."
              className="p-2 bg-transparent border border-gray-300 rounded-lg h-32"
            />
          </div>
          <div className="flex justify-end">
            {!loading ? (
              <Button
                type="submit"
                className="w-full sm:2-52 bg-blue-500 p-2 rounded "
              >
                Send Message
              </Button>
            ) : (
              <button
                disabled
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Sending...
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactMe;
