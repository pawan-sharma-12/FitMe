import { exec } from 'child_process';
import path from 'path'
import { PythonShell } from 'python-shell'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const GetYogaPoses = async (args) => {
  // const args = ['hand', 'eye', 'head', 'neck'];

  const options = {
    pythonPath: 'python',
    scriptPath: __dirname,
    args: args,
  };

  try {
    const result = await PythonShell.run('test.py', options);
    const lastArrayIndex = result.length - 1;
    const sanitizedResult = result[lastArrayIndex].replace(/'/g, '"');
    const yogaPoses = JSON.parse(sanitizedResult);


 

    // yogaPoses.forEach(e => {
    //   console.log('datatype in getYogaposes.js ', typeof e);

    // });

    // console.log(yoga_poses);


    return yogaPoses;

  } catch (error) {
    console.error(error);
  }
};
export default GetYogaPoses;