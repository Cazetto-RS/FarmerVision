// :root {
//     --verde: #7AB317;
//     --verde-escuro: #4d720e;
//     --verde-amarelado: #CEA80F;
//     --verde-amarelado-escuro: #9e810c;

//     --amarelo: #F0971C;
//     --amarelo-escuro: #b97516;
//     --amarelo-avermelhado: #CC3E18;
//     --amarelo-avermelhado-escuro: #922e12;

//     --vermelho: #C21B12;
//     --vermelho-escuro: #8b160f;

//     --azul: #11baac;
//     --azul-escuro: #0c9287;

//     --branco:#f6eee0;
//     --cinza-claro: #5a5a5a;
//     --cinza: #373636;
//     --cinza-escuro: #151515;
//     --preto: #0B0B0B;
// }

function renderGraficoTemperatura(ctx, dadosTemperatura) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['AM 06:00', 'AM 06:30', 'AM 07:00', 'AM 07:30', 'AM 08:00'],
            datasets: [{
                label: 'Temperatura (°C)',
                data: dadosTemperatura,
                backgroundColor: 'rgba(146, 46, 18, 0.5)',
                borderColor: '#922e12',
                borderWidth: 2,
                // tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Histórico de Temperatura'
                },
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Temperatura (°C)'
                    },
                    grid: {
                        color: 'rgb(246, 238, 224, 0.2)' // cor da grade do eixo X
                    }
                },
                x: {
                    grid: {
                        color: 'rgb(246, 238, 224, 0.2)'
                    }
                }
            }
        }
    });
}

function renderGraficoUmidade(ctx, dadosUmidade) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['AM 06:00', 'AM 06:30', 'AM 07:00', 'AM 07:30', 'AM 08:00'],
            datasets: [{
                label: 'Umidade (%)',
                data: dadosUmidade,
                backgroundColor: 'rgba(17, 186, 172, 0.5)',
                // borderColor: '#11baac',
                // borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Histórico de Umidade'
                },
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Umidade (%)'
                    },
                    grid: {
                        color: 'rgb(246, 238, 224, 0.2)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgb(246, 238, 224, 0.2)'
                    }
                }
            }
        }
    });
}