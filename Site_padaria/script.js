const produtos = [
  { nome: "Bolo por quilo", preco: 45, imagem: "img/bolo.webp" },
  { nome: "Pão francês", preco: 1, imagem: "img/pao-frances.jpg" },
  { nome: "Coxinha", preco: 6, imagem: "img/coxinha.jpg" },
  { nome: "Cuca caseira", preco: 35, imagem: "img/cuca.jpg" },
  { nome: "Pão de queijo", preco: 4, imagem: "img/paodequeijo.jpg" },
  { nome: "Sonho recheado", preco: 7, imagem: "img/sonho.jpg" }
];

const lista = document.getElementById("listaProdutos");
const modal = document.getElementById("modal");
const titulo = document.getElementById("modalTitulo");
const precoSpan = document.getElementById("modalPreco");
const quantidadeInput = document.getElementById("quantidade");
const totalSpan = document.getElementById("total");

let produtoAtual = null;
let carrinho = [];

produtos.forEach(p => {
  lista.innerHTML += `
    <div class="produto" onclick="abrirModal('${p.nome}', ${p.preco})">
      <img src="${p.imagem}">
      <h3>${p.nome}</h3>
      <p>R$ ${p.preco.toFixed(2)}</p>
    </div>
  `;
});

function abrirModal(nome, preco) {
  produtoAtual = { nome, preco };
  titulo.textContent = nome;
  precoSpan.textContent = preco.toFixed(2);
  quantidadeInput.value = 1;
  atualizarTotal();
  modal.style.display = "flex";
}

function fecharModal() {
  modal.style.display = "none";
}

function atualizarTotal() {
  const qtd = parseFloat(quantidadeInput.value);
  totalSpan.textContent = (qtd * produtoAtual.preco).toFixed(2);
}

quantidadeInput.addEventListener("input", atualizarTotal);

function adicionarAoCarrinho() {
  const qtd = parseFloat(quantidadeInput.value);
  carrinho.push({
    nome: produtoAtual.nome,
    preco: produtoAtual.preco,
    quantidade: qtd
  });
  fecharModal();
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("itensCarrinho");
  const totalEl = document.getElementById("totalCarrinho");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
  lista.innerHTML += `<li>${item.nome} (${item.quantidade}) - R$ ${subtotal.toFixed(2)}</li>`;

  });

totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;

}

function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio");
    return;
  }

  let mensagem = "Olá! Gostaria de fazer um pedido:\n\n";
  let totalPedido = 0;

  carrinho.forEach(i => {
    const subtotal = i.preco * i.quantidade;
    totalPedido += subtotal;

    mensagem += `- ${i.nome}\n`;
    mensagem += `  Quantidade: ${i.quantidade}\n`;
    mensagem += `  Valor: R$ ${subtotal.toFixed(2)}\n\n`;
  });

  mensagem += `Total do pedido: R$ ${totalPedido.toFixed(2)}`;

  const mensagemCodificada = encodeURIComponent(mensagem);
  const url = `https://wa.me/5545999385126?text=${mensagemCodificada}`;

  window.open(url, "_blank");
}




/* SLIDER */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

setInterval(() => {
  slides[slideIndex].classList.remove("ativo");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("ativo");
}, 4000);

function toggleCarrinho() {
  const carrinho = document.getElementById("carrinho");
  carrinho.classList.toggle("aberto");
}
