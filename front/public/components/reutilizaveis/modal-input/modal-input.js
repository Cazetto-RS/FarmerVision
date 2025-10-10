export function openModal(title, contentHTML) {
  let modal = document.getElementById("universalModal");

  // Se ainda não existe, carrega o HTML dinamicamente
  if (!modal) {
    fetch("/components/modal/modal.html")
      .then(res => res.text())
      .then(html => {
        document.body.insertAdjacentHTML("beforeend", html);
        setTimeout(() => openModal(title, contentHTML), 100);
      });
    return;
  }

  // Define conteúdo
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalContent").innerHTML = contentHTML;

  modal.classList.remove("modal-hidden");

  // Botão fechar
  const closeBtn = document.getElementById("modalCloseBtn");
  closeBtn.onclick = closeModal;

  // Fechar clicando fora
  modal.querySelector(".modal-overlay").addEventListener("click", e => {
    if (e.target.classList.contains("modal-overlay")) closeModal();
  });
}

export function closeModal() {
  const modal = document.getElementById("universalModal");
  if (modal) modal.classList.add("modal-hidden");
}
