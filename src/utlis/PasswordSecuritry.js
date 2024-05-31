import bcrypt from 'bcrypt';

export const generateHashPassword = async (password, saltRounds = 10) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    console.error('Error generating hash:', err.message);
    throw err; 
  }
};

export const compareHashPassword = async (password, hash) => {
    try {
      const match = await bcrypt.compare(password, hash);
      return match;
    } catch (err) {
      console.error('Error comparing passwords:', err.message);
      throw err; 
    }
  };