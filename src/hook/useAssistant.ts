import { setAssistant } from '@/store/reducers/authReducer';
import { useAppDispatch } from '@/store/store';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import moment from 'moment';
import { text } from 'stream/consumers';

const keygemini = 'AIzaSyBw6FlYtaHpU1QYKmKUkES_vAnRDrrMSf0';

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(keygemini);

const run = async () => {
  console.log('Running.....');
  const url = 'https://api.dify.ai/v1/chat-messages';
  const token = 'app-cje8JxG7HCJMJF1Dt1V0WJpR';

  const prompt = {
    inputs: {},
    query: 'What is today?',
    response_mode: 'streaming',
    conversation_id: '',
    user: 'abc-123'
  };
  try {
    const resp = await axios.post(url, prompt, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // const data = resp.data.replace('data: ', '');
    console.log('data-->', resp.data);

    // console.log('messages-->', JSON.parse(data));
  } catch (error) {
    console.log('error-->', error);
  }

  // let content = [];
  // let finish = false;

  // const prompt = 'What are the specs of the iPhone 13 Pro Max?';
  //gen streaming
  // const results = await model.generateContentStream(prompt);
  // let content = [];
  // let finish = false;
  // let prevTime = Date.now();
  // for await (const chunk of results.stream) {
  //   console.log('chunk-->', chunk);
  //   console.log();
  //   if (chunk.candidates) {
  //     const { role, parts } = chunk.candidates[0].content;
  //     const text = parts[0]?.text?.replace(/(\r\n|\n|\r|\*)/gm, ' ') || '';

  //     const end = Date.now();

  //     useAppDispatch(setAssistant({ text, role, finish: false, resp_time: end - prevTime }));

  //     prevTime = end;
  //   }
  // }
  console.log('------finish------');
  // console.log('content-->', content);
};

export default run;
