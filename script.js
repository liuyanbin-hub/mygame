document.addEventListener('DOMContentLoaded', () => {
    const words = ['apple', 'banana', 'cat', 'dog', 'elephant', 'fish', 'grape', 'hat'];
    const gameBoard = document.getElementById('game-board');
    const backgroundMusic = document.getElementById('background-music');
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');

    // 添加开始游戏按钮
    const startButton = document.createElement('button');
    startButton.textContent = '开始游戏';
    startButton.style.fontSize = '1.5em';
    startButton.style.padding = '10px 20px';
    startButton.style.marginTop = '20px';
    startButton.style.cursor = 'pointer';
    document.getElementById('game-container').appendChild(startButton);

    startButton.addEventListener('click', () => {
        backgroundMusic.volume = 0.5; // 设置音量
        backgroundMusic.play(); // 播放背景音乐
        startButton.style.display = 'none'; // 隐藏按钮
    });

    // 创建单词卡片
    const cards = [...words, ...words].sort(() => Math.random() - 0.5);
    let selectedCards = [];
    let matchedCards = [];

    cards.forEach((word, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.word = word;
        card.textContent = word;

        // 点击卡片时播放单词发音
        card.addEventListener('click', () => {
            const audio = new Audio(`${word}.mp3`); // 确保路径正确
            audio.play();

            if (selectedCards.length < 2 && !card.classList.contains('matched')) {
                card.classList.add('selected');
                selectedCards.push(card);
                if (selectedCards.length === 2) {
                    checkMatch();
                }
            }
        });

        gameBoard.appendChild(card);
    });

    function checkMatch() {
        const [card1, card2] = selectedCards;
        if (card1.dataset.word === card2.dataset.word) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
            correctSound.play();
        } else {
            wrongSound.play();
            setTimeout(() => {
                card1.classList.remove('selected');
                card2.classList.remove('selected');
            }, 1000);
        }
        selectedCards = [];
        if (matchedCards.length === cards.length) {
            alert('恭喜你，全部匹配成功！');
        }
    }
});