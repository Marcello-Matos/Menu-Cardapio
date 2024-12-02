// Seleção dos elementos HTML
const menu = document.getElementById("menu"); // Menu onde estão os produtos
const cartBtn = document.getElementById("cart-btn"); // Botão para abrir o modal do carrinho
const cartModal = document.getElementById("cart-modal"); // Modal do carrinho
const cartItemsContainer = document.getElementById("cart-items"); // Contêiner onde os itens do carrinho serão listados
const cartTotal = document.getElementById("cart-total"); // Total do carrinho
const checkoutBtn = document.getElementById("checkout-btn"); // Botão de checkout
const closeModalBtn = document.getElementById("close-model-btn"); // Botão para fechar o modal
const cartCounter = document.getElementById("cart-count"); // Contador de itens no carrinho
const addressInput = document.getElementById("address"); // Campo de endereço
const addressWarn = document.getElementById("address-warn"); // Aviso sobre o endereço

let cart = []; // Array que vai armazenar os itens do carrinho

// Abrir o modal do carrinho quando o botão de carrinho for clicado
cartBtn.addEventListener("click", function () {
  cartModal.style.display = "flex"; // Exibe o modal
});

// Fechar o modal quando clicar fora dele
cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none"; // Fecha o modal
  }
});

// Fechar o modal do carrinho ao clicar no botão de fechar
closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none"; // Fecha o modal
});

// Evento para adicionar item no carrinho ao clicar no botão de "Adicionar ao Carrinho"
menu.addEventListener("click", function (event) {
  let parenButton = event.target.closest(".add-to-cart-btn"); // Verifica se o botão de adicionar ao carrinho foi clicado

  if (parenButton) {
    const name = parenButton.getAttribute("data-name"); // Nome do item
    addToCart(name); // Chama a função para adicionar ao carrinho
  }
});

// Função para adicionar item no carrinho
function addToCart(name) {
  const existingItem = cart.find((item) => item.name === name); // Verifica se o item já existe no carrinho

  if (existingItem) {
    existingItem.quantity += 1; // Se já existir, aumenta a quantidade
  } else {
    cart.push({
      name,
      price: 0, // Define o preço como 0 (gratuito)
      quantity: 1, // Se não existir, adiciona o item com quantidade 1
    });
  }

  updateCartModal(); // Atualiza o modal
  updateCartCounter(); // Atualiza o contador de itens no carrinho
}

// Função para atualizar o conteúdo do modal com os itens do carrinho
function updateCartModal() {
  cartItemsContainer.innerHTML = ""; // Limpa os itens no modal

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div"); // Cria um novo elemento para cada item no carrinho

    cartItemElement.innerHTML = `
      <div class="flex items-center justify-between">
          <div>
              <p class="font-medium">${item.name}</p>
              <p>Qtd: ${item.quantity}</p> <!-- Mostra a quantidade de cada item -->
              <p class=" font-bold mt-2">Grátis</p> <!-- Exibe o preço como "Grátis" -->
          </div>
          <div>
              <button class="remove-from-cart-btn" onclick="decreaseItem('${item.name}')">Remover</button> <!-- Botão para remover uma unidade do item -->
          </div>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemElement); // Adiciona o item ao contêiner
  });

  cartTotal.innerText = `Total: Grátis`; // Define o total como "Grátis"
}

// Função para atualizar o contador de itens no botão do carrinho
function updateCartCounter() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // Calcula o número total de itens no carrinho
  cartCounter.innerText = totalItems; // Exibe o número total no contador
}

// Função para remover uma unidade de um item do carrinho
function decreaseItem(name) {
  const item = cart.find((item) => item.name === name); // Encontra o item no carrinho

  if (item) {
    item.quantity -= 1; // Diminui a quantidade do item
    if (item.quantity === 0) {
      // Se a quantidade chegar a 0, remove o item do carrinho
      cart = cart.filter((cartItem) => cartItem.name !== name);
    }
  }

  updateCartModal(); // Atualiza o modal
  updateCartCounter(); // Atualiza o contador de itens
}

// Função para verificar se o restaurante está aberto
function checkRestauranteOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 5 && hora < 23; // Restaurante aberto entre 18h e 23h
}

checkoutBtn.addEventListener("click", function () {
  const isOpen = checkRestauranteOpen();
  if (!isOpen) {
    alert("RESTAURANTE FECHADO NO MOMENTO!");
    return;
  }

  if (cart.length === 0) return;

  // Define valor padrão para o número da mesa, desativando a validação
  const mesaNumero = "1"; 

  // Montando a mensagem do pedido
  let message = "Olá, gostaria de fazer um pedido:\n\n";
  cart.forEach((item) => {
    message += `Produto: ${item.name} - Quantidade: ${item.quantity}\n`;
  });
  message += `\nMesa:  ${mesaNumero}\n`;
  message += "\nPor favor, confirmem o pedido.";

  // Codificando a mensagem para ser usada na URL
  const encodedMessage = encodeURIComponent(message);

  // Link para o WhatsApp com a mensagem do pedido
  const whatsappLink = `https://wa.me/5511938028926?text=${encodedMessage}`;

  // Limpar o carrinho após o envio
  cart = []; // Zera o carrinho
  updateCartModal(); // Atualiza o modal para refletir o carrinho vazio
  updateCartCounter(); // Atualiza o contador de itens no carrinho

  // Redireciona o usuário para o WhatsApp
  window.open(whatsappLink, "_blank");
});

// CONFIGURAÇÃO DO QR CODE INICO



// CONFIGURAÇÃO PARA SEGUNDA TELA FIM