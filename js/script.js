//Slider function

const slider = document.querySelector("#length-slider");
const lengthDisplay = document.querySelector("#length-display");

function updateSlider() {
  const value = slider.value;
  const min = slider.min ? slider.min : 0;
  const max = slider.max ? slider.max : 20;

  //hitung persentase
  const percentage = ((value - min) / (max - min)) * 100;

  lengthDisplay.textContent = value;
  slider.style.background = `linear-gradient(to right, var(--clr-primary) ${percentage}%, var(--clr-dark) ${percentage}%)`;
}

slider.addEventListener("input", updateSlider);

//jalankan sekali saat halaman pertama kali di buat
updateSlider();

const keys = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

// Elemen UI
const passwordDisplay = document.querySelector(".generator__password");
const generateBtn = document.querySelector(".generator__submit-btn");
const form = document.querySelector(".generator__card");

// Checkboxes
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

// Generate Password
function generatePassword() {
  let length = +slider.value;
  let charPool = "";
  let generatedPassword = "";

  // 1. Cek checkbox dan tambahkan ke charpool
  if (uppercaseEl.checked) charPool += keys.uppercase;
  if (lowercaseEl.checked) charPool += keys.lowercase;
  if (numbersEl.checked) charPool += keys.numbers;
  if (symbolsEl.checked) charPool += keys.symbols;

  // 2. Validasi: Jika tidak ada yang dicentang, jangan buat apa-apa
  if (charPool === "") {
    alert("Please select at least one option!");
    return;
  }

  // 3. Loop untuk mengambil karakter acak dari pool
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    generatedPassword += charPool[randomIndex];
  }

  // 4. Tampilkan di layar & hapus class placeholder
  passwordDisplay.textContent = generatedPassword;
  passwordDisplay.classList.remove("generator__password--placeholder");
}

const strengthText = document.querySelector(".generator__strength-label");
const bars = document.querySelectorAll(".generator__bar"); // Mengambil semua bar (total 4)

// func update strength
function updateStrength() {
  const count = [
    uppercaseEl.checked,
    lowercaseEl.checked,
    numbersEl.checked,
    symbolsEl.checked,
  ].filter(Boolean).length;
  const isUpper = uppercaseEl.checked;
  const isLower = lowercaseEl.checked;
  const isNumber = numbersEl.checked;
  const isSymbol = symbolsEl.checked;
  const length = +slider.value;

  let strength = "";
  let activeBars = 0;
  let color = "";

  console.log({
    Upper: isUpper,
    Lower: isLower,
    Number: isNumber,
    Symbol: isSymbol,
    "Total Count": count,
    Length: length,
  });

  // SISTEM SKOR: Berikan penilaian yang lebih fleksibel
  // 1. Cek yang paling kuat dulu (Paling atas)
  if (count === 4 && length >= 12) {
    strength = "STRONG";
    activeBars = 4;
    color = "var(--clr-primary)";
  }
  // 2. Cek yang menengah
  else if (count >= 3 && length >= 10) {
    strength = "MEDIUM";
    activeBars = 3;
    color = "var(--clr-yellow)";
  }
  // 3. Cek yang lemah
  else if (count >= 2 && length >= 8) {
    strength = "WEAK";
    activeBars = 2;
    color = "var(--clr-orange)";
  }
  // 4. Sisanya adalah sangat lemah
  else {
    strength = "TOO WEAK!";
    activeBars = 1;
    color = "var(--clr-red)";
  }

  // Update UI
  strengthText.textContent = strength;

  // Reset & Warnai
  bars.forEach((bar, index) => {
    if (index < activeBars) {
      bar.style.backgroundColor = color;
      bar.style.borderColor = color;
    } else {
      bar.style.backgroundColor = "transparent";
      bar.style.borderColor = "var(--clr-almost-white)";
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  generatePassword(); // Membuat password
  updateStrength(); // Menilai kekuatannya
});


const copyBtn = document.querySelector(".generator__copy-btn");
const copyText = document.getElementById("copy-success");

copyBtn.addEventListener("click", () => {
  const password = passwordDisplay.textContent;
  if (password === "P4$5W0rD!") return;

  navigator.clipboard.writeText(password).then(() => {
    copyText.style.opacity = "1";
    setTimeout(() => {
      copyText.style.opacity = "0";
    }, 2000);
  });
});