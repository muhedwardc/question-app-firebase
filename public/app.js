const questionsContainer = document.getElementById('questions');
const form = document.getElementById('form')

// create question card
function createQuestionElement(question) {
    const questionHTML = `
            <article class="media">
                <div class="media-content">
                    <div class="content">
                    <p>
                        <strong>${question.senderName || 'anonim'}</strong>
                        <br>
                        ${question.question}
                    </p>
                    </div>
                </div>
                <div class="media-action">
                    <div><strong>${question.vote}</strong></div>
                    <button style="margin-left: 16px;" class="button button-vote is-small">Vote</button>
                    <button style="margin-left: 16px;" class="button button-delete is-danger is-small">Hapus</button>
                </div>
            </article>
        `
    
    const questionElement = document.createElement('div');
    questionElement.setAttribute('class', 'box');
    questionElement.innerHTML = questionHTML;

    questionElement.querySelector('.button-vote').addEventListener('click', () => { voteQuestion(question) })
    questionElement.querySelector('.button-delete').addEventListener('click', () => { deleteQuestion(question) })
    
    return questionElement;
}

function voteQuestion(question) {
    if (!currentUser()) {
        alert('login dulu!');
    } else if (question.voters.includes(currentUser().uid)){
        alert('sudah vote!');
    } else {   
        db.collection('questions').doc(question.id).update({
            vote: firebase.firestore.FieldValue.increment(1),
            voters: firebase.firestore.FieldValue.arrayUnion(currentUser().uid)
        });
    }
}


function deleteQuestion(question) {
    if (!currentUser()) {
        alert('login dulu!');
    } else if (question.senderId !== currentUser().uid) {
        alert('tidak diizinkan');
    } else {
        db.collection('questions').doc(question.id).delete()
    }
}

// render question into list
function renderQuestions(questions) {
    questionsContainer.innerHTML = '';

    questions.forEach(question => {
        const questionElement = createQuestionElement(question);
        questionsContainer.appendChild(questionElement);
    })
}

db.collection('questions').orderBy('vote', 'desc').onSnapshot(snap => {
    const questions = [];
    snap.forEach(doc => {
        questions.push({
            id: doc.id,
            ...doc.data()
        })
    })
    renderQuestions(questions);
})

function addQuestion(question) {
    if (!question || !question.trim()) {
        alert('tolong diisi dulu')
    } else if (currentUser()) {
        db.collection('questions').add({
            question,
            senderName: currentUser().displayName,
            senderId: currentUser().uid,
            vote: 0,
            voters: []
        })
    } else {
        alert('login dulu');
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const question = form.question.value;
    addQuestion(question);
    form.reset();
})
