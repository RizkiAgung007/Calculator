// Mengambil elemen-elemen DOM yang diperlukan
const displayHistory = document.querySelector(".history"); 
const displayInput = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equals = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity");

// Inisialisasi variabel
let dishis = ""; // Menyimpan display history
let disinp = ""; // Menyimpan input pengguna saat ini
let result = null; // Menyimpan hasil operasi
let lastOperation = ""; // Menyimpan operasi terakhir yang dilakukan
let haveDot = false; // Flag untuk mengecek apakah ada titik desimal di input

// Menambahkan event listener untuk setiap tombol angka
numbers.forEach((nums) => {
    nums.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            // Jika pengguna mengklik titik desimal dan belum ada titik desimal di input
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            // Jika pengguna mengklik titik desimal dan sudah ada titik desimal di input
            return;
        }
        // Menambahkan angka atau titik desimal ke input
        disinp += e.target.innerText;
        displayInput.innerText = disinp; // Menampilkan input ke layar
    });
});

// Menambahkan event listener untuk setiap tombol operasi
operations.forEach((ops) => {
    ops.addEventListener("click", (e) => {
        if (!disinp) return; // Jika tidak ada input, tidak melakukan apa-apa
        haveDot = false; // Reset flag titik desimal
        const opsName = e.target.innerText; // Mengambil nama operasi
        if (dishis && disinp && lastOperation) {
            // Jika ada sejarah, input, dan operasi terakhir, lakukan operasi matematika
            mathOperation();
        } else {
            // Jika tidak, set hasil ke input saat ini
            result = parseFloat(disinp);
        }
        clearVar(opsName); // Membersihkan variabel dan update sejarah
        lastOperation = opsName; // Set operasi terakhir ke operasi saat ini
    });
});

// Fungsi untuk membersihkan variabel dan update sejarah
function clearVar(name = "") {
    dishis += disinp + " " + name + " "; // Tambahkan input dan operasi ke sejarah
    displayHistory.innerText = dishis; // Update sejarah di layar
    displayInput.innerText = ""; // Kosongkan input di layar
    disinp = ""; // Reset input pengguna
    tempResult.innerText = result; // Tampilkan hasil sementara
}

// Fungsi untuk melakukan operasi matematika
function mathOperation() {
    if (lastOperation === "X") {
        result = parseFloat(result) * parseFloat(disinp);
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(disinp);
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(disinp);
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(disinp);
    } else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(disinp);
    }
}

// Menambahkan event listener untuk tombol sama dengan (=)
equals.addEventListener("click", () => {
    if (!disinp || !dishis) return; // Jika tidak ada input atau sejarah, tidak melakukan apa-apa
    haveDot = false; // Reset flag titik desimal
    mathOperation(); // Lakukan operasi matematika
    clearVar(); // Membersihkan variabel dan update sejarah
    displayInput.innerText = result; // Tampilkan hasil akhir di layar
    tempResult.innerText = ""; // Kosongkan hasil sementara
    disinp = result; // Set input pengguna ke hasil
    dishis = ""; // Reset sejarah
});

// Menambahkan event listener untuk tombol clear all (AC)
clearAll.addEventListener("click", () => {
    dishis = ""; // Reset sejarah
    disinp = ""; // Reset input pengguna
    result = ""; // Reset hasil
    lastOperation = ""; // Reset operasi terakhir
    haveDot = false; // Reset flag titik desimal
    displayHistory.innerText = ""; // Kosongkan sejarah di layar
    displayInput.innerText = ""; // Kosongkan input di layar
    tempResult.innerText = ""; // Kosongkan hasil sementara di layar
});

// Menambahkan event listener untuk tombol clear last (CE)
clearLast.addEventListener("click", () => {
    displayInput.innerText = ""; // Kosongkan input di layar
    disinp = ""; // Reset input pengguna
});

// Menambahkan event listener untuk mendeteksi keydown pada keyboard
window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9"
    ) {
        clickButton(e.key); // Panggil fungsi clickButton jika key adalah angka
    } else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "/" ||
        e.key === "%"
    ) {
        clickOperation(e.key); // Panggil fungsi clickOperation jika key adalah operasi
    } else if (e.key === "*") {
        clickOperation("X"); // Panggil fungsi clickOperation untuk perkalian
    } else if (e.key === "Enter" || e.key === "=") {
        clickEqual(); // Panggil fungsi clickEqual jika key adalah Enter atau =
    } else if (e.key === "Backspace") {
        clickClear(); // Panggil fungsi clickClear jika key adalah Backspace
    }
});

// Fungsi untuk men-simulasikan klik tombol angka
function clickButton(key) {
    numbers.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    });
}

// Fungsi untuk men-simulasikan klik tombol operasi
function clickOperation(key) {
    operations.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click();
        }
    });
}

// Fungsi untuk men-simulasikan klik tombol sama dengan (=)
function clickEqual() {
    equals.click();
}

// Fungsi untuk men-simulasikan klik tombol clear all (AC)
function clickClear() {
    clearAll.click();
}
