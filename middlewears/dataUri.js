import DataURI from 'datauri/parser.js'; // Correct path for the DataURI module
import path from 'path';

const fileToDataURI = (file) => {
  if (!file || !file.buffer || !file.originalname) {
    throw new Error('Invalid file object or missing properties.');
  }

  try {
    const dataUri = new DataURI();
    
    dataUri.format(path.extname(file.originalname).toString(), file.buffer);

    return dataUri.content;
  } catch (error) {
    console.error('Error converting file to Data URI:', error);
    throw error;
  }
};

export default fileToDataURI;
