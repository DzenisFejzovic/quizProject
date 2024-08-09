import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmEwMGE0M2MtZjE0MS00ODY5LWFlODMtNDEwNjdiY2Q2M2QyIiwidHlwZSI6ImZyb250X2FwaV90b2tlbiJ9.azyEoY5czWo5DGlo10Aw4caJsjZcqLz_DPEAe7mzzhI";

export default function Main() {
  const [starter, setstarter] = useState(false);
  const [diff, setdiff] = useState("easy");
  const [hearts, setHearts] = useState("");
  const [answer, setAnswer] = useState("");
  const [random, setRandom] = useState("");
  const [wrong, setWrong] = useState("");
  const [wrong2, setWrong2] = useState("");
  const [wrong3, setWrong3] = useState("");
  const [right, setRight] = useState("");

  async function generate() {
    console.log("generate");

    let options;

    if (diff === "easy") {
      options = {
        method: "POST",
        url: "https://api.edenai.run/v2/text/question_answer",
        headers: {
          authorization: `Bearer ${API_KEY}`,
        },
        data: {
          texts: ["Here is a sample text"],
          temperature: 1,
          examples: [
            [
              "What is human life expectancy in the United States?",
              "78 years.",
            ],
          ],
          providers: "openai",
          question: `give me a completely random question that an elementary student would know / make the question easy, make it short and that doesnt cost too many credits`,
          examples_context: "what is 1+1?, what is a fish, what is a banana?",
        },
      };
    } else if (diff === "medium") {
      options = {
        method: "POST",
        url: "https://api.edenai.run/v2/text/question_answer",
        headers: {
          authorization: `Bearer ${API_KEY}`,
        },
        data: {
          texts: ["Here is a sample text"],
          temperature: 1,
          examples: [
            [
              "What is human life expectancy in the United States?",
              "78 years.",
            ],
          ],
          providers: "openai",
          question: `give me a completely random question that an middleschool student would know/ make the question a medium difficulty, make it short and that doesnt cost too many credits`,
          examples_context: "what is 50^2?, what is light, what is a cell?",
        },
      };
    } else if (diff === "hard") {
      options = {
        method: "POST",
        url: "https://api.edenai.run/v2/text/question_answer",
        headers: {
          authorization: `Bearer ${API_KEY}`,
        },
        data: {
          texts: ["Here is a sample text"],
          temperature: 1,
          examples: [
            [
              "What is human life expectancy in the United States?",
              "78 years.",
            ],
          ],
          providers: "openai",
          question: `give me a completely random question that an highschool student would know / make the question hard to answer, make it short and that doesnt cost too many credits`,
          examples_context:
            "what is 50^2 and divided by 12?, what is a human philosophically, what happened in 1523?",
        },
      };
    }

    console.log("Request Options:", options);

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const fetchedAnswer = response.data.openai.answers[0];
      setAnswer(fetchedAnswer);

      const [rightResponse, wrongResponse1, wrongResponse2, wrongResponse3] =
        await Promise.all([
          rightAnswer(fetchedAnswer),
          wrongAnswer1(fetchedAnswer),
          wrongAnswer2(fetchedAnswer),
          wrongAnswer3(fetchedAnswer),
        ]);

      setRight(rightResponse);
      setWrong(wrongResponse1);
      setWrong2(wrongResponse2);
      setWrong3(wrongResponse3);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function start() {
    if (
      hearts > 10 ||
      hearts < 1 ||
      isNaN(hearts) ||
      (hearts === "" && starter === false)
    ) {
      alert("choose between 1 and 10 lives");
    } else {
      setstarter(true);
      setRandom(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
      setAnswer("");
      setWrong("");
      setWrong2("");
      setWrong3("");
      setRight("");
      await generate();
    }

    if (hearts < 1) {
      setstarter(false);
      setAnswer("");
      setWrong("");
      setWrong2("");
      setWrong3("");
      setRight("");
    }
  }

  function changeLives(e) {
    setHearts(e.target.value);
  }

  async function wrongAnswer1(answer) {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/question_answer",
      headers: {
        authorization: `Bearer ${API_KEY}`,
      },
      data: {
        texts: [`Here is a sample text ${Math.random()}`],
        temperature: 1,
        examples: [
          ["What is human life expectancy in the United States?", "78 years."],
        ],
        providers: "openai",
        question: `Generate a single plausible wrong answer for the following quiz question. The answer should be unique and clearly different from other potential wrong answers. The question is: ${answer}.`,
        examples_context: `if given a question like:What is the capital of France? you answer with:1.Berlin 2.Madrid or 3.Rome`,
      },
    };

    console.log("Request Options:", options);

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data.openai.answers[0];
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async function wrongAnswer2(answer) {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/question_answer",
      headers: {
        authorization: `Bearer ${API_KEY}`,
      },
      data: {
        texts: [`Here is a sample text ${Math.random()}`],
        temperature: 1,
        examples: [
          ["What is human life expectancy in the United States?", "78 years."],
        ],
        providers: "openai",
        question: `create a completely random one worded answer to a question you made up but do not show`,
        examples_context: `if given a question like:What is the capital of France? you answer with:1.Berlin 2.Madrid or 3.Rome`,
      },
    };

    console.log("Request Options:", options);

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data.openai.answers[0];
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async function wrongAnswer3(answer) {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/question_answer",
      headers: {
        authorization: `Bearer ${API_KEY}`,
      },
      data: {
        texts: [`Here is a sample text ${Math.random()}`],
        temperature: 1,
        examples: [
          ["What is human life expectancy in the United States?", "78 years."],
        ],
        providers: "openai",
        question: `For the quiz question: ${answer}, generate one incorrect one worded answer that is unique and clearly distinct from other potential wrong answers.`,
        examples_context: `if given a question like:What is the capital of France? you answer with:1.Berlin 2.Madrid or 3.Rome`,
      },
    };

    console.log("Request Options:", options);

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data.openai.answers[0];
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async function rightAnswer(answer) {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/question_answer",
      headers: {
        authorization: `Bearer ${API_KEY}`,
      },
      data: {
        texts: ["Here is a sample text"],
        temperature: 1,
        examples: [
          ["What is human life expectancy in the United States?", "78 years."],
        ],
        providers: "openai",
        question: `The following question: "${answer}". Provide a single-word correct answer. The answer should be short, concise, and cost-effective.`,
        examples_context:
          "In 2017, U.S. life expectancy was 78.6 years, a banana is yellow",
      },
    };

    console.log("Request Options:", options);

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data.openai.answers[0];
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  function Answered1() {
    if (random === 1) {
      setAnswer("");
      start();
    } else {
      setHearts(hearts - 1);
      setAnswer("");
      start();
    }
  }

  function Answered2() {
    if (random === 2) {
      setAnswer("");
      start();
    } else {
      setHearts(hearts - 1);
      setAnswer("");
      start();
    }
  }

  function Answered3() {
    if (random === 3) {
      setAnswer("");
      start();
    } else {
      setHearts(hearts - 1);
      setAnswer("");
      start();
    }
  }
  function Answered4() {
    if (random === 4) {
      setAnswer("");
      start();
    } else {
      setHearts(hearts - 1);
      setAnswer("");
      start();
    }
  }

  console.log(diff);

  return (
    <>
      <div className="center">
        <div className="container">
          <div className="container2">
            {starter !== true ? (
              <div className="infoHolder">
                <p className="title">🎒 Quiz Game 📝</p>

                <p className="diff">difficulty: {diff}!</p>
                <div className="diffHolder">
                  <button className="easy" onClick={() => setdiff("easy")}>
                    Easy
                  </button>
                  <button className="medium" onClick={() => setdiff("medium")}>
                    Medium
                  </button>
                  <button className="hard" onClick={() => setdiff("hard")}>
                    Hard
                  </button>
                </div>
                <p className="diff">Lives: {hearts}</p>
                <div className="diffHolder">
                  <input
                    type="text"
                    className="heartHandler"
                    placeholder="5"
                    onChange={changeLives}
                  />
                  <p>choose between 1 and 10 lives</p>
                </div>
                <div className="startHolder">
                  <button className="start" onClick={start}>
                    Start
                  </button>
                </div>
              </div>
            ) : null}

            {starter === true ? (
              <div className="infoHolder">
                <p className="title">🎒 Quiz Game 📝</p>
                <p className="question">{answer}</p>

                <div className="answerHolder">
                  <div className="one" onClick={Answered1}>
                    <p>
                      {" "}
                      {random === 1
                        ? right
                        : random === 2
                        ? wrong
                        : random === 3
                        ? wrong2
                        : wrong3}
                    </p>
                  </div>
                  <div className="two" onClick={Answered2}>
                    <p>
                      {" "}
                      {random === 1
                        ? wrong
                        : random === 2
                        ? right
                        : random === 3
                        ? wrong2
                        : wrong3}
                    </p>
                  </div>
                  <div className="three" onClick={Answered3}>
                    <p>
                      {" "}
                      {random === 1
                        ? wrong
                        : random === 2
                        ? wrong2
                        : random === 3
                        ? right
                        : wrong3}
                    </p>
                  </div>
                  <div className="four" onClick={Answered4}>
                    <p>
                      {" "}
                      {random === 1
                        ? wrong
                        : random === 2
                        ? wrong2
                        : random === 3
                        ? wrong3
                        : right}
                    </p>
                  </div>
                </div>

                <div className="infoHolder2">
                  <p>lives: {hearts}</p>
                  <p>difficulty: {diff}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
