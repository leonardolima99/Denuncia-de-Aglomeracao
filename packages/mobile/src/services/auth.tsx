import api from './api';

interface Response {
  token: string;
  auth: boolean;
  level: number;
}

export async function signIn(
  username: string,
  password: string,
): Promise<Response> {
  try {
    const response = await api.post('login', {
      body: {
        username,
        password,
      },
    });
    /* console.log(response.data); */
    return response.data;
  } catch (error) {
    console.log('Erro!', error);
    return {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibGV2ZWwiOjEsImlhdCI6MTYxNjczNjk1NCwiZXhwIjoxNjE3MzQxNzU0fQ.7qVJpRFjaVS4PyjEci3H94ECbLsQaRyrB4nm-KMeaNo',
      auth: false,
      level: 1,
    };
  }
  /* return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'jk12h3j21h3jk212h3jk12h3jkh12j3kh12k123hh21g3f12f3',
        auth: true,
      });
    }, 2000);
  }); */
}
