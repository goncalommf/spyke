/*const { Telegraf } = require ('telegraf');

const bot = new Telegraf("7032882263:AAGSTAZu-X_EWndHfgDTL_i2Pdj1pSCCWmk");
const bo = new Telegraf("7467784859:AAFKqVrItQceQcpwMWIexArhhEtK8JlbPLI");
bot.telegram.sendMessage(7318704100, "teste")
bo.telegram.sendMessage(7318704100, "fffffffffff")
//bot.telegram.sendMessage(-4133469671, "teste")


//bot.start((ctx) => ctx.reply('Welcome'))
//bot.help((ctx) => ctx.reply('Send me a sticker'));
//bot.on('sticker', (ctx) => ctx.reply(''))
//bot.hears('hi', (ctx) => ctx.reply('Hey there'))
//bot.launch()

function updateMessage() {
    // Obtém o valor da textbox
    const userInput = document.getElementById('userInput').value;

    // Verifica se o campo não está vazio
    if (!userInput) {
        alert('Por favor, digite algo.');
        return;
    }

    // Atualiza o conteúdo do elemento com id 'displayMessage'
    document.getElementById('displayMessage').innerText = `Você digitou: ${userInput}`;
}
*/

// código 2 novo para ligar ao telegram

/*
document.getElementById('telegramForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const chatId = document.getElementById('chatId').value;
    const message = document.getElementById('message').value;

    if (!chatId || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const botToken = '7467784859:AAFKqVrItQceQcpwMWIexArhhEtK8JlbPLI';  // Substitua pelo token do seu bot
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const params = {
        chat_id: chatId,
        text: message
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            document.getElementById('responseMessage').innerText = 'Mensagem enviada com sucesso!';
        } else {
            document.getElementById('responseMessage').innerText = 'Erro ao enviar mensagem: ' + data.description;
        }
    })
    .catch(error => {
        document.getElementById('responseMessage').innerText = 'Erro: ' + error.message;
    });
}); */
const userChatIdMap = {
    'grupo': '-4133469671',
    'messagebot': '7318704100',
    'grupo2': '-4287179667',
    // Adicione mais mapeamentos conforme necessário
};

document.getElementById('telegramForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    const usernames = document.getElementById('usernames').value.split(',').map(name => name.trim());
    const message = document.getElementById('message').value;
    const box = document.getElementById('box').value;

     if (!usernames.length || (!message && !box)) {
        alert('Por favor, preencha pelo menos um dos campos de mensagem.');
        return;
    }

    if (message && message.length > 10000) {
        alert('A mensagem excede o limite de 10000 caracteres.');
        return;
    }


    const botToken = '7032882263:AAGSTAZu-X_EWndHfgDTL_i2Pdj1pSCCWmk';  // Substitua pelo token do seu bot
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    let sendPromises = [];

    usernames.forEach(username => {
        const chatId = userChatIdMap[username];

        if (!chatId) {
            document.getElementById('responseMessage').innerText += `Nome ${username} não encontrado.\n`;
            return;
        }

        if (message) {
            const params = {
                chat_id: chatId,
                text: message
            };

        /* const params = {
            chat_id: chatId,
            text: message
            };

           const boxParams = {
           chat_id: chatId,
           text: box
           };
*/ 
        sendPromises.push(
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    document.getElementById('responseMessage').innerText += `Mensagem enviada com sucesso para ${username}!\n`;
                } else {
                    document.getElementById('responseMessage').innerText += `Erro ao enviar mensagem para ${username}: ${data.description}\n`;
                }
            })
            .catch(error => {
                document.getElementById('responseMessage').innerText += `Erro ao enviar mensagem para ${username}: ${error.message}\n`;
            })
        );
    }
    if (box) {
        const boxParams = {
            chat_id: chatId,
            text: box
        };

    sendPromises.push(
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boxParams)
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                document.getElementById('responseMessage').innerText += `Mensagem enviada com sucesso para ${username}!\n`;
            } else {
                document.getElementById('responseMessage').innerText += `Erro ao enviar mensagem para ${username}: ${data.description}\n`;
            }
        })
        .catch(error => {
            document.getElementById('responseMessage').innerText += `Erro ao enviar mensagem para ${username}: ${error.message}\n`;
        })
    );
}
}); 


    // Espera todas as mensagens serem enviadas
    Promise.all(sendPromises).then(() => {
        document.getElementById('telegramForm').reset();
        console.log('Todas as mensagens foram processadas.');
    });
});