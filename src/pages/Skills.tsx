import useResponsiveWidth from '@/hook/useResponsiveWidth';
import coursera from '@/assets/coursera.png';
import udemy from '@/assets/udemy.png';
import palette from '@/assets/palette.png';
import programming from '@/assets/programming.png';
import docker from '@/assets/docker.png';
import server from '@/assets/server.png';

const Skills = () => {
  const { sm, md, xl, lg } = useResponsiveWidth();

  const front = ['Tailwind', 'Bootstrap', 'React', 'Redux', 'RTK Query', 'Material UI'];
  const lang = ['Typescript', 'Javascript', 'Python', 'C#', 'SQL', 'HTML', 'CSS'];
  const storage = ['MongoDB', 'Redis', 'Firebase', 'Elasticsearch'];
  const devops = ['Docker', 'Git', 'CLI'];
  return (
    <div className={`flex w-screen h-auto p-8 flex-wrap`}>
      {/* <div className={`${lg ? 'w-4/12' : 'w-full flex'} p-8 border border-blue-400`}> */}
      <div
        className={`mb-8 ${!sm ? 'w-full' : !lg ? 'w-6/12' : 'w-4/12 mr-8'} rounded-3xl bg-gradient-to-tr from-gray-900 from-70%  to-blue-950 p-8 relative`}>
        <div className="flex items-center mb-8">
          <img src={coursera} className="w-20 mr-4" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-blue-400">Coursera Certificcate</span>
            <span className="text-xs">Google data analytics</span>
          </div>
        </div>

        <div className="flex items-center">
          <img src={udemy} className="w-20 mr-4 rounded-full" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-blue-400">Udemy Certificate</span>
            {/* <span className="text-xs">Google data analytics</span> */}
          </div>
        </div>

        <span className="absolute text-xs bottom-4 right-8">Read more...</span>
      </div>

      <div
        className={`mb-8 ${!sm ? 'w-full' : 'w-4/12 mr-8'} rounded-3xl bg-gradient-to-tr from-gray-900 from-70% to-blue-950 p-8`}>
        <div className="h-full">
          <div className="flex items-center">
            <img src={palette} className="w-6 mr-2" />
            <span className="text-sm">Client side</span>
          </div>
          <div className="flex flex-wrap h-auto my-4">
            {front.map((skill, index) => (
              <span
                key={`client-side-${index}`}
                className="w-auto px-3 py-1 mb-3 mr-3 text-xs font-bold text-teal-500 rounded-full bg-teal-950">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* <div className={`${lg ? 'w-4/12' : 'w-full'} h-full p-8 border border-blue-400`}> */}
      <div
        className={`mb-8 ${!sm ? 'w-full' : !lg ? 'w-7/12' : 'w-3/12 mr-8'} rounded-3xl h-auto bg-gradient-to-tr from-gray-900 from-70% to-blue-950 p-8`}>
        <div className="flex items-center">
          <img src={programming} className="w-6 mr-2" />
          <span className="text-sm">Programming languages and frmeworks</span>
        </div>

        <div className="flex flex-wrap h-auto my-4">
          {lang.map((skill, index) => (
            <span
              key={`lang-${index}`}
              className="w-auto px-3 py-1 mb-3 mr-3 text-xs font-bold text-teal-500 rounded-full bg-teal-950">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-tr from-gray-900 from-70% to-blue-950  h-3/6 rounded-3xl"></div>
      {/* </div> */}

      {/* <div className={`${lg ? 'w-4/12' : 'w-6/12'} h-full p-8 border border-blue-400 `}> */}
      <div
        className={`mb-8 ${!sm ? 'w-full' : 'w-4/12 mr-8'} rounded-3xl max-h-60 bg-gradient-to-tr from-gray-900 from-70% to-blue-950 p-8 `}>
        <div className="flex items-center">
          <img src={docker} className="w-6 mr-2" />
          <span className="text-sm">Devops</span>
        </div>

        <div className="flex flex-wrap h-auto my-4">
          {devops.map((skill, index) => (
            <span
              key={`lang-${index}`}
              className="w-auto px-3 py-1 mb-3 mr-3 text-xs font-bold text-teal-500 rounded-full bg-teal-950">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8 rounded-3xl w-auto bg-gradient-to-tr from-gray-900 from-70% to-blue-950 p-8">
        <div className="flex items-center">
          <img src={server} className="w-6 mr-2" />
          <span className="text-sm">Data storage and caching</span>
        </div>

        <div className="flex flex-wrap h-auto my-4">
          {storage.map((skill, index) => (
            <span
              key={`lang-${index}`}
              className="w-auto px-3 py-1 mb-3 mr-3 text-xs font-bold text-teal-500 rounded-full bg-teal-950">
              {skill}
            </span>
          ))}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Skills;
