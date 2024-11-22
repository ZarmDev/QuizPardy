import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

export function QuizComponent(props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  // false == front of card, true == back of card
  const [cardSide, setCardSide] = useState("front");
  const [finished, setFinished] = useState(false);
  // const questions = [
  //   { question: 'What is 2 + 2?', answer: '4' },
  //   { question: 'What is the capital of France?', answer: 'Paris' }
  // ];

  const showAnswer = () => {
    setCardSide("back")
  };

  const nextQuestion = () => {
    // If we are at the last question
    if (questionIndex == props.questions.length - 1) {
      // Then tell the user it's done
      setFinished(true)
      alert("You have finished your flashcards!")
      return;
    }
    setQuestionIndex((prevIndex) => prevIndex + 1);
    setCardSide("front")
  }
  return (
    <View>
      {cardSide == "front" ? <Text>{props.questions[questionIndex].question}</Text> : <Text>{props.questions[questionIndex].answer}</Text>}
      {cardSide == "front" ? <Button title="See answer" onPress={showAnswer} />
        : <Button title="See front" onPress={() => { setCardSide("front") }} />}
      <Button title="Next flashcard" onPress={nextQuestion}></Button>
    </View>
  );
}

export function QuizComponentWithOptions(props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wasAnswerCorrect, setWasAnswerCorrect] = useState(false);
  const [finished, setFinished] = useState(false);

  // Format:
  // const questions = [
  //   { question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4', reason: "2 + 2 = 4" },
  //   { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris'], answer: 'Paris', reason: "Paris is in France..." }
  // ];

  const handleAnswer = (option) => {
    if (option === props.questions[questionIndex].answer) {
      console.log('Correct!');
      setWasAnswerCorrect(true)
    } else {
      console.log('Wrong!');
      setWasAnswerCorrect(false)
    }
    setShowAnswer(true)
    alert(`Your answer was ${wasAnswerCorrect ? "Correct" : "Wrong"}!\n\nThe answer was ${props.questions[questionIndex][0]} becase ${props.questions[questionIndex][6]}`)
  };

  function nextQuestion() {
    setShowAnswer(false)
    // If we are at the last question
    if (questionIndex == props.questions.length - 1) {
      // Then tell the user it's done
      setFinished(true)
      alert("You have finished your questions!")
      return;
    }
    setQuestionIndex((prevIndex) => prevIndex + 1);
  }

  return (
    <View>
      <Text>Progress: {(questionIndex / props.questions.length) * 100}% done</Text>
      <Text>{props.questions[questionIndex][1]}</Text>
      {/* {showAnswer ? <Text>Your answer was {wasAnswerCorrect ? "Correct" : "Wrong"}!</Text> : <></>} */}
      {/* {showAnswer ? <Text>The answer was {props.questions[questionIndex][0]} becase {props.questions[questionIndex][6]}</Text> : <></>} */}
      {props.questions[questionIndex].slice(2, 6).map((option, index) => (
        <Button key={index} title={option} onPress={() => handleAnswer(option)} />
      ))}
      {showAnswer ? <Button style={styles.top} title={"Next question"} onPress={nextQuestion}></Button> : <></>}
    </View>
  );
};

export function QuizComponentWithOptionsMultiplayer(props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wasAnswerCorrect, setWasAnswerCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [otherUsers, setOtherUsers] = useState({});
  const [username, setUsername] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // Format:
  // const questions = [
  //   { question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4', reason: "2 + 2 = 4" },
  //   { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris'], answer: 'Paris', reason: "Paris is in France..." }
  // ];

  const handleAnswer = (option) => {
    if (option === props.questions[questionIndex].answer) {
      console.log('Correct!');
      setWasAnswerCorrect(true)
    } else {
      console.log('Wrong!');
      setWasAnswerCorrect(false)
    }
    setShowAnswer(true)
  };

  function nextQuestion() {
    setShowAnswer(false)
    // If we are at the last question
    if (questionIndex == props.questions.length - 1) {
      // Then tell the user it's done
      setFinished(true)
      alert("You have finished your questions!")
      return;
    }
    setQuestionIndex((prevIndex) => prevIndex + 1);
  }

  async function getFriendsData() {
    const formData = new URLSearchParams();
    formData.append('serverName', props.roomNameProp);
    try {
      const response = await fetch('http://10.106.28.42:3000/getAllUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setOtherUsers(data)
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  async function joinRoomWithUsername() {
    const formData = new URLSearchParams();
    formData.append('serverName', props.roomNameProp);
    formData.append('username', username);
    try {
      const response = await fetch('http://10.106.28.42:3000/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
    setShowQuiz(true)
  }

  useEffect(() => {
    const refreshFriends = setInterval(() => {
      getFriendsData()
    }, 5000)

    return () => {
      clearInterval(refreshFriends)
      // Component unmounted
      console.log('Component is unmounted');
    }
  })

  var whatToRender = null;
  if (showQuiz) {
    whatToRender = (<View>
      <Text>Progress: {(questionIndex / props.questions.length) * 100}% done</Text>
      <Text>Other user's progress: {Object.keys(otherUsers).map((item) => { return <Text>{item}</Text> })}</Text>
      <Text>{props.questions[questionIndex][1]}</Text>
      {showAnswer ? <Text>Your answer was {wasAnswerCorrect ? "Correct" : "Wrong"}!</Text> : <></>}
      {showAnswer ? <Text>The answer is {props.questions[questionIndex][0]}</Text> : <></>}
      {props.questions[questionIndex].slice(2, 6).map((option, index) => (
        <Button key={index} title={option} onPress={() => handleAnswer(option)} />
      ))}
      {showAnswer ? <Button style={styles.top} title={"Next question"} onPress={nextQuestion}></Button> : <></>}
    </View>)
  } else {
    whatToRender = (<View>
      <TextInput
        label="What is your username?"
        onChangeText={text => setUsername(text)}
      />
      <Button title="Submit" onPress={() => { joinRoomWithUsername() }}></Button>
    </View>)
  }

  return whatToRender;
};

const styles = StyleSheet.create({
  top: {
    marginTop: "10%"
  }
});