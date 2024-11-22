# QuizPardy
- A quiz app with multiplayer functionality
- Originally started as a hackathon project with me and two people

# Video (or see screenshots at the bottom of the page)
https://www.youtube.com/shorts/zR8mL3mMrqY

# Features
- Playable templates
- Ability to create local quizzes
- (May be broken) Ability to join servers with other players
- Multiplayer server

# Commands
bun expo install --fix

bun expo start --tunnel

# Screenshots
![quizpardy - frame at 0m30s](https://github.com/user-attachments/assets/705202f0-22c7-4f11-9372-4992972c6618)
![quizpardy - frame at 0m19s](https://github.com/user-attachments/assets/b10245d7-bd41-416c-88eb-76244e3f7502)

# Notes:
- Remove @react-navigation/stack and instead use @react-navigation/native-stack
- Sanitize input especially the title of the quiz (you can crash the device probably)
