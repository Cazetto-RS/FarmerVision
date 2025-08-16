const rotas = [
    {
        'path': '',
        'component': '/page/home.html'
    },
    {
        'path': '/',
        'component': '/page/home.html'
    },
    {
        'path': '/plantas',
        'component': '/page/plantas/plantas.html'        
    },
    {
        'path': '/teste',
        'component': '/page/teste.html'
    },
    {
        'path': '/cadastro',
        'component': '/page/perfil/cadastro.html'
    },
    {
        'path': '/login',
        'component': '/page/perfil/login.html'
    },
    {
        'path': '/perfil',
        'component': '/page/perfil/perfil.html'
    }
];

const rotear = (rotaUrl) => {
    const rotaEncontrada = rotas.find(rota => rota.path.toLowerCase() === rotaUrl.toLowerCase());
    return rotaEncontrada || {
        path: '/error',
        component: '/page/erro.html'
    };
}

export const loadPage = async (callBackPageReturned) => {
    try {
        let rota = rotear(window.location.pathname);
        const response = await fetch(rota.component);

        if (!response.ok) {
            throw new Error(`Erro ao carregar a página: ${response.statusText}`);
        }

        const page = await response.text();
        callBackPageReturned(page); // Chama o callback com o conteúdo

    } catch (error) {
        console.error('Erro ao carregar página:', error);
    }
}