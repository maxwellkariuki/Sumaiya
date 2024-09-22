const ideas = {
    craftyIdeas: [
        "Create a scrapbook with your favorite memories.",
        "Make friendship bracelets using colorful threads.",
        "DIY candles with essential oils.",
        "Paint flower pots and plant herbs.",
        "Upcycle old clothes into tote bags.",
        "Create a vision board with magazine cutouts.",
        "Make your own greeting cards.",
        "Start a journal with daily drawings.",
        "Create a personalized calendar.",
        "Make a photo collage for your wall.",
        "DIY bath bombs with natural ingredients.",
        "Create a custom mug with ceramic paint.",
        "Make scented sachets for drawers.",
        "Build a birdhouse using recycled materials.",
        "Knit or crochet a small blanket.",
        "Design and paint your own T-shirts.",
        "Create a memory jar filled with notes.",
        "Make a dreamcatcher with twine and feathers.",
        "DIY soap using glycerin and molds.",
        "Create a decorative wreath for your door.",
        "Make a terrarium with succulents."
    ],
    beautifulWomen: [
        "Mikasa Ackerman (Attack on Titan)",
        "Hinata Hyuga (Naruto)",
        "Asuka Langley Soryu (Neon Genesis Evangelion)",
        "Sailor Moon (Sailor Moon)",
        "Nami (One Piece)",
        "Erza Scarlet (Fairy Tail)",
        "Yoruichi Shihouin (Bleach)",
        "Rem (Re:Zero)",
        "Kagome Higurashi (Inuyasha)",
        "Tohsaka Rin (Fate/stay night)",
        "Faye Valentine (Cowboy Bebop)",
        "Chii (Chobits)",
        "Moka Akashiya (Rosario + Vampire)",
        "C.C. (Code Geass)",
        "Sakura Haruno (Naruto)",
        "Shinobu Kocho (Demon Slayer)",
        "Mitsuha Miyamizu (Your Name)",
        "Mai Sakurajima (Rascal Does Not Dream of Bunny Girl Senpai)",
        "Nico Robin (One Piece)",
        "Kaguya Shinomiya (Kaguya-sama: Love Is War)",
        "Homura Akemi (Puella Magi Madoka Magica)"
    ],
    cheapPlaces: [
        "Karura Forest",
        "Nairobi National Park (visit the entrance area)",
        "Giraffe Centre",
        "Bomas of Kenya (some shows are affordable)",
        "Nairobi Railway Museum",
        "Uhuru Park",
        "The David Sheldrick Wildlife Trust",
        "Kenyatta International Conference Centre (KICC)",
        "Nairobi National Museum (on certain days)",
        "The Nairobi Gallery",
        "Kazuri Beads Factory",
        "Nairobi Market (like Maasai Market)",
        "Kenyatta Market",
        "Hindu Union Temple",
        "The Gikambura Forest",
        "Waiyaki Way (for food markets)",
        "Mamba Village (affordable entry)",
        "Oloolua Nature Trail",
        "Kibera Art Centre",
        "Bomas of Kenya (cultural displays)",
        "Nairobi Railway Station"
    ]
};

async function chatWithAI() {
    const aiInput = document.getElementById("ai-input").value.trim();
    const chatbox = document.getElementById("chatbox");

    if (aiInput) {
        chatbox.innerHTML += `<div><b>Sumaiya:</b> ${aiInput}</div>`;
        
        if (aiInput.toLowerCase() === 'help') {
            displayHelp();
            document.getElementById("ai-input").value = '';
            return;
        }

        if (aiInput.toLowerCase() === 'ideas') {
            const randomIdea = ideas.craftyIdeas[Math.floor(Math.random() * ideas.craftyIdeas.length)];
            chatbox.innerHTML += `<div>AI: ${randomIdea}</div>`;
            document.getElementById("ai-input").value = '';
            return;
        }

        if (aiInput.toLowerCase() === 'beautiful women') {
            const randomWoman = ideas.beautifulWomen[Math.floor(Math.random() * ideas.beautifulWomen.length)];
            chatbox.innerHTML += `<div>AI: ${randomWoman}</div>`;
            document.getElementById("ai-input").value = '';
            return;
        }

        if (aiInput.toLowerCase() === 'cheap places') {
            const randomPlace = ideas.cheapPlaces[Math.floor(Math.random() * ideas.cheapPlaces.length)];
            chatbox.innerHTML += `<div>AI: ${randomPlace}</div>`;
            document.getElementById("ai-input").value = '';
            return;
        }

        // Simulated AI response (replace with actual API call)
        try {
            const aiResponse = await fetch(`https://api.chatgpt.com/respond?query=${aiInput}`);
            if (!aiResponse.ok) throw new Error('Network response was not ok');
            const responseData = await aiResponse.json();
            chatbox.innerHTML += `<div>AI: ${responseData.reply}</div>`;
        } catch (error) {
            chatbox.innerHTML += `<div>AI: Sorry, I couldn't process your request. Please try again.</div>`;
            console.error('Error fetching AI response:', error);
        }

        document.getElementById("ai-input").value = '';
    }
}


const questions = [
    "What made you smile today?",
    "What is something you learned today?",
    "What are you grateful for today?",
    "What was the best part of your day?",
    "How did you help someone today?",
];

const quotes = [
    "Believe you can and you're halfway there.",
    "Act as if what you do makes a difference. It does.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "You are never too old to set another goal or to dream a new dream.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
];

const audioLinks = [
    'link1.mp3',  
    'link2.mp3',
    'link3.mp3'
];

let audio = new Audio();
let quoteInterval;

async function loadAboutSection() {
    const content = `
        <div class="section my-4">
            <h2>To my dearest Sumaiya</h2>
           <p> Hi Sumaiya, It was a fun activity to be able to write this long ass code which was totally worth it. I enjoyed it and it is because of how good you make me feel. I hope this can count as a reason for you to trust me with your heart. ;) <br><br><br> your loving friend, <br> <b>Maxwell</b>. </p>
        </div>
    `;
    document.getElementById('content').innerHTML = content;
}

function loadSection(section) {
    let content = '';

    if (section === 'home') {
        content = `
            <div class="section my-4">
                <h2>Daily Question</h2>
                <p id="daily-question-text">${getQuestion()}</p>
                <input type="text" id="answer-input" class="form-control" placeholder="Your answer">
                <button class="btn btn-success my-2" onclick="submitAnswer()">Submit</button>
                <button class="btn btn-primary my-2" onclick="saveJournalToFile()">Save Journal</button>
                <p id="answer-output"></p>
            </div>
            <div class="section my-4">
                <h2>Quotes</h2>
                <div id="quote-display"></div>
            </div>
            <div class="section my-4">
                <h2>Timer</h2>
                <input type="number" id="timer-input" class="form-control" placeholder="Minutes">
                <button class="btn btn-info my-2" onclick="startTimer()">Start Timer</button>
                <p id="timer-output"></p>
            </div>
            <div class="section my-4">
                <h2>AI Chat</h2>
                <div id="chatbox" class="border p-3 mb-3" style="height: 200px; overflow-y: auto;"></div>
                <input type="text" id="ai-input" class="form-control" placeholder="Type 'help' for commands">
                <button class="btn btn-warning my-2" onclick="chatWithAI()">Send</button>
            </div>
            <button id="play-pause-button" class="btn btn-primary" onclick="toggleMusic()">Play Music</button>
        `;
    } else if (section === 'about') {
        loadAboutSection();
        return; // Prevent overwriting content
    }

    document.getElementById('content').innerHTML = content;
    if (section === 'home') {
        displayQuestion(); 
        showRandomQuote(); 
    }
}

function getQuestion() {
    const now = new Date();
    const hours = now.getUTCHours() + 3; // Nairobi time
    return questions[hours % questions.length];
}

function displayQuestion() {
    const questionElement = document.getElementById("daily-question-text");
    questionElement.textContent = getQuestion();
}

function submitAnswer() {
    const answerInput = document.getElementById("answer-input");
    const answerOutput = document.getElementById("answer-output");
    const question = getQuestion();

    answerOutput.textContent = `Your answer: ${answerInput.value}`;
    
    // Save entry to local storage
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    journalEntries.push({ date: new Date().toLocaleString(), question, answer: answerInput.value });
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));

    answerInput.value = '';
}

let timerInterval;

function startTimer() {
    const duration = parseInt(document.getElementById("timer-input").value) * 60;
    let timeRemaining = duration;
    const timerDisplay = document.getElementById("timer-output");

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's up!";
        }
        timeRemaining--;
    }, 1000);
}

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById('quote-display');
    quoteDisplay.innerText = quotes[randomIndex];
    quoteDisplay.classList.add('quote-animation');

    setTimeout(() => {
        quoteDisplay.classList.remove('quote-animation');
    }, 1000);
}

function toggleMusic() {
    const playPauseButton = document.getElementById("play-pause-button");
    if (audio.paused) {
        const randomLink = audioLinks[Math.floor(Math.random() * audioLinks.length)];
        audio.src = randomLink;
        audio.play();
        playPauseButton.textContent = "Pause Music";

        quoteInterval = setInterval(showRandomQuote, 10000);
    } else {
        audio.pause();
        playPauseButton.textContent = "Next Music";
        clearInterval(quoteInterval);
    }
}

async function chatWithAI() {
    const aiInput = document.getElementById("ai-input").value.trim();
    const chatbox = document.getElementById("chatbox");

    if (aiInput) {
        chatbox.innerHTML += `<div><b>Sumaiya:</b> ${aiInput}</div>`;
        
        if (aiInput.toLowerCase() === 'help') {
            displayHelp();
        } else if (aiInput.toLowerCase() === 'ideas') {
            const randomIdea = ideas.craftyIdeas[Math.floor(Math.random() * ideas.craftyIdeas.length)];
            chatbox.innerHTML += `<div>AI: ${randomIdea}</div>`;
        } else if (aiInput.toLowerCase() === 'beautiful women') {
            const randomWoman = ideas.beautifulWomen[Math.floor(Math.random() * ideas.beautifulWomen.length)];
            chatbox.innerHTML += `<div>AI: ${randomWoman}</div>`;
        } else if (aiInput.toLowerCase() === 'cheap places') {
            const randomPlace = ideas.cheapPlaces[Math.floor(Math.random() * ideas.cheapPlaces.length)];
            chatbox.innerHTML += `<div>AI: ${randomPlace}</div>`;
        } else {
            // Simulated AI response (replace with actual API call)
            try {
                const aiResponse = await fetch(`https://api.yourchatgptapi.com/respond?query=${aiInput}`);
                if (!aiResponse.ok) throw new Error('Network response was not ok');
                const responseData = await aiResponse.json();
                chatbox.innerHTML += `<div>AI: ${responseData.reply}</div>`;
            } catch (error) {
                chatbox.innerHTML += `<div>AI: Sorry, I couldn't process your request. Please try again.</div>`;
                console.error('Error fetching AI response:', error);
            }
        }

        document.getElementById("ai-input").value = ''; // Clear input after processing
    }
}


function displayHelp() {
    const commands = [
        "ideas - Get creative ideas.",
    ];

    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<div>AI: Here are the available commands:</div>`;
    commands.forEach(command => {
        chatbox.innerHTML += `<div> - ${command}</div>`;
    });
}

function saveJournalToFile() {
    const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    const journalText = journalEntries.map(entry => 
        `${entry.date}: ${entry.question}\nAnswer: ${entry.answer}\n`
    ).join('\n');

    const blob = new Blob([journalText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'journal.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Initial load
window.onload = function() {
    loadSection('home');
};
