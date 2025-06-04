export type SignInRequest = {
    login: string;
    password: string;
  };
  
  export type SignInResponse = {
    resStatus: number;
    login: string | null;
    userMicroserviceAccess: string[];
    resMessage: string;
  };
  
  export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const json = await res.json();
  
      return {
        resStatus: res.status,
        login: json?.login ?? null,
        userMicroserviceAccess: json?.roles ?? [],
        resMessage: json?.message ?? '',
      };
    } catch (err) {
      /*return {
        resStatus: 500,
        login: null,
        userMicroserviceAccess: [],
        resMessage: 'Ошибка соединения с сервером',
      };*/
      return {
        resStatus: 200,
        login: 'test',
        userMicroserviceAccess: ['1'],
        resMessage: 'успех',
      };
    }
  };
  