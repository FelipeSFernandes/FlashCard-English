const words = [];
let currentWordIndex = 0;
let correctScore = 0;
let wrongScore = 0;
let answerChecked = false;

async function loadWords() {
    try {
        const response = await fetch('words.js');
        if (!response.ok) {
            throw new Error('Erro ao carregar palavras');
        }
        const data = await response.text();
        const wordsArray = JSON.parse(data);
        words.push(...wordsArray);
        document.getElementById('word-count').innerText = `Total de palavras: ${words.length}`;
        showWord();
    } catch (error) {
        console.error('Erro ao carregar palavras:', error);
    }
}

function showWord() {
    if (currentWordIndex >= words.length) {
        document.getElementById('word').innerText = 'Fim dos flashcards!';
        document.getElementById('translation').disabled = true;
        document.getElementById('check-answer').disabled = true;
        document.getElementById('next-word').disabled = true;
        return;
    }
    const word = words[currentWordIndex].english;
    document.getElementById('word').innerText = word;
    document.getElementById('result').innerText = '';
    document.getElementById('translation').value = '';
    document.getElementById('check-answer').disabled = false;
    answerChecked = false;
}

document.getElementById('check-answer').addEventListener('click', () => {
    if (answerChecked) return; // Evita a verificação múltipla da mesma resposta
    const answer = document.getElementById('translation').value.trim();
    const correctAnswer = words[currentWordIndex].portuguese;
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById('result').innerText = 'Correto!';
        document.getElementById('result').style.color = '#66fcf1';
        correctScore++;
    } else {
        document.getElementById('result').innerText = `Errado! A resposta correta é: ${correctAnswer}`;
        document.getElementById('result').style.color = '#ff4c4c';
        wrongScore++;
    }
    updateScore();
    document.getElementById('check-answer').disabled = true; // Desabilita o botão após a verificação
    answerChecked = true;
});

document.getElementById('next-word').addEventListener('click', () => {
    currentWordIndex++;
    showWord();
});

function updateScore() {
    document.getElementById('correct-score').innerText = correctScore;
    document.getElementById('wrong-score').innerText = wrongScore;
}

loadWords();
