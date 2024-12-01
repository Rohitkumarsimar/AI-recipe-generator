import axios from "axios";
import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  // Function to format bold text
  const formatBoldText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); // Replaces **bold** with <b>bold</b>
  };

  //Answer from API
  const generateAnswer = async () => {
    setAnswer("loading...");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBTCnyhCrHKS-sDz52x9yAsEEr7hp30cos`,
        method: "post",
        headers: {
          "Content-Type": "application/json", // Ensure proper request format
        },
        data: {
          contents: [
            {
              parts: [
                {
                  text: question,
                },
              ],
            },
          ],
        },
      });

      // Log the entire response to inspect its structure
      setAnswer("Response:", response.data);

      // Accessing response based on API's actual structure
      if (response.data && response.data.candidates) {
        const rawAnswer = response.data.candidates[0]?.content?.parts[0]?.text || "No content found";

        const formattedAnswer = formatBoldText(rawAnswer);  // Format the answer before setting it

        setAnswer(formattedAnswer);
      } else {
        setAnswer("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setAnswer("An error occurred while fetching the answer.");


    }
  }
  //Enter button
const Enterbutton = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    generateAnswer();
  }
};



return (
  <>
    <Navbar />
    <div className="min-h-screen bg-orange-100 flex flex-col items-center justify-center p-4">



      {answer && (<pre className="bg-orangeTheme-light text-orangeTheme-dark border-1 border-orangeTheme-dark rounded-[30px] p-4 w-[1000px]  m-16 shadow-inner whitespace-pre-wrap break-words"
        dangerouslySetInnerHTML={{ __html: answer }}
      />)}



      <div className="fixed bottom-0 bg-orange-100 flex items-center justify-center  w-full p-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={Enterbutton}
          rows={1} // Use rows=1 for single-line height initially
          placeholder="Enter ingredients or recipe ideas..."
          className="flex border-2 border-orange-200 bg-orangeTheme-light text-orangeTheme-dark rounded-[25px] p-4 w-[1000px] h-[70px] text-xl shadow-md focus:outline-none focus:ring-2 focus:ring-orangeTheme resize-none"
        ></textarea>

        <button
          onClick={generateAnswer}
          className="ml-4 bg-orange-200 border-2 border-orange-300 text-green font-semibold px-6 py-4 rounded-[50px] shadow-lg hover:bg-orangeTheme-dark focus:outline-none focus:ring-2 focus:ring-orangeTheme-dark"
        >
          Cook it
        </button>
      </div>


    </div>
  </>
)
}

export default App
