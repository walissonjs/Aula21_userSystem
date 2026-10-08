// 1º passo - Identificar as Variáveis do projeto: CRIANDO VARIÁVEIS DO HTML
const form = document.querySelector('#formCadastro');
const buscarCEP = document.querySelector('#buscarCEP'); // inserido no html na linha 117: <button class="btn btn-primary id="buscarCep">Buscar CEP</button>
const cep = document.querySelector('#cep');


// OUVIR EVENTOS>>> Definindo eventos para os botões de ação (botãos de cadastro e reset)
form.addEventListener("submit", function(event){
    event.preventDefault(); // Impedir que o botão submit recarregue a página sempre que clicar nele (desta forma as informações digitadas não serão perdidas até que a funcionalidade do botão enviar seja definida)
// 2º Passo - Criar o 'OBJETO' para armazenar as informações    
// TODO: Explica esta función y sus parámetros
    console.log(Object.fromEntries([...form.elements]		 // [ ] : array | ...form.elements : armazena todos os dados dentro deste array elements para que ele faça de forma automática a entrada dos dados e organize dentro do array 
	        .filter(element => element.id)  //   filtra os elementos do array por id e devolve noutro array seguindo a ordem de id
	        .map(element => [element.id, element.value] 		//   mapeia todos os elementos e devolve mapeados com .id e .valor
	        )));           
	    form.reset();		// Aplica o reset do formulário (limpar o formulário) para limpar os campos após o usuário clicar em enviar/cadastrar                              									
	});


// 3º PASSO: ADICIONANDO VALIDADOR COM BUSCA WEB PARA O CEP BRASILEIRO
// Variáveis buscarCEP e cep foram criadas (linhas 3 e 4)
buscarCEP.addEventListener("click", async function(){ // Será uma função assíncrona, vai levar um certo tempo para resgatar as informações da API VaiCEP
    const numCEP = cep.value.replace(/\D/g, "");  // (/\D/g, "") : Expressão regular para substituir tudo que não são números. o replace vai substituir por caractéres vazios. Ex: 60.712-108 >> o código faz ficar assim: 60712108. Mais detalhes: / : delimita a expressão regular. \D : representa qualquer caractere que não seja um dígito (número). /g : global todo o restante (em números)
        if (numCEP.length !== 8) {
            mensagem("Digite um CEP válido!", "erro");
            return
        } try {
            const resposta = await fetch(`https://viacep.com.br/ws/${numCEP}/json/`); // fetch vai puxar os dados do link
            const dados = await resposta.json(); // vai converter a resposta dos dados fetch para json (criando objeto)
                
                if (!resposta.ok || dados.erro) throw new Error("CEP não encontrado! verifique Verifique novamente.");
// O numCEP informado vai puxar da API os dados que precisamos, no código abaixo, descrevemos o ID atribuido no html e qual informação vai complementar vindo da API (importante observar os nomes no objeto e atentar as posições corretamente para fazer a vinculação de informações)
                    document.querySelector('#logradouro').value = dados.logradouro;
                    document.querySelector('#bairro').value = dados.bairro;
    // TAMBÉM PODE SER COLOCAR COM " " (aspas duplas)
                    document.querySelector("#estado").value = dados.uf;
                    document.querySelector("#cidade").value = dados.localidade;
                    mensagem("Endereço Encontrato!");

        } catch (erro) { // informar que há um erro na informação que o usuário passou.
            mensagem(erro.message, "erro");
        }

});

// =============================================APLICAR BIBLIOTECA DE ALERTAS -->
function mensagem(texto, tipo = "sucesso") {
    Toastify ({      // parâmetros da própria estrutura do Toastify, ver documentação 
        text: texto,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: tipo === "sucesso"
                ? "#198754" // validador "true", ou seja, se positivo
                : "#dc3545" // validador "false", ou seja, se negativo
        }
    }).showToast();
}