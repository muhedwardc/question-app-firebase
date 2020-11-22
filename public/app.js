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
    
    return questionElement;
}

// render question into list
function renderQuestions(questions) {
    questionsContainer.innerHTML = '';

    questions.forEach(question => {
        const questionElement = createQuestionElement(question);
        questionsContainer.appendChild(questionElement);
    })
}
