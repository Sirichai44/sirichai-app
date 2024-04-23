import { setAssistant, setAssistantFinish } from '@/store/reducers/authReducer';
import { useAppDispatch } from '@/store/store';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { text } from 'stream/consumers';

const keygemini = 'AIzaSyBw6FlYtaHpU1QYKmKUkES_vAnRDrrMSf0';

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(keygemini);

const run = async () => {
  console.log('Running.....');

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const prompt = 'What are the specs of the iPhone 13 Pro Max?';
  //gen streaming
  const results = await model.generateContentStream(prompt);

  // let content = [];
  // let finish = false;

  for await (const chunk of results.stream) {
    if (chunk.candidates) {
      const { role, parts } = chunk.candidates[0].content;
      useAppDispatch(
        setAssistant({ text: parts[0]?.text.replace(/(\r\n|\n|\r|\*)/gm, ' ') || '', role })
      );
    }
    console.log('chunk-->', chunk);

    // console.log('content-->', content);
  }

  useAppDispatch(setAssistantFinish(true));
  console.log('------finish------');
  // console.log('content-->', content);
};

export default run;
