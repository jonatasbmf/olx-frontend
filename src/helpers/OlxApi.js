const BASEAPI = 'http://alunos.b7web.com.br:501';

const apiFetchPost = async (endpoint, body) => {
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',

        }
    });
};

const OlxApi = {
    login: async (email, password) => {
        const json = await apiFetchPost(
            '/user/signin',
            { email, password }
        );

        return { json };
    }
};

export default () => OlxApi;