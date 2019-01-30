console.log('correct');
const submitBtn = document.querySelector('#submit-btn');
if (submitBtn) {
  submitBtn.addEventListener('click', e => {
    const csrf = document.querySelector("[name='_csrf']").value;
    const questionForms = document.querySelectorAll('.question-form');
    if (questionForms.length !== 0) {
      const questions = Object.values(questionForms).map(questionForm => {
        const question = questionForm.children[0].firstElementChild.textContent;
        const childElements =
          questionForm.firstElementChild.children[1].children;
        const correctAnswer = childElements[0].value;
        const answers = childElements[1].children;
        const checkedAnswer = Object.values(answers).find(
          answer => answer.firstElementChild.checked === true
        ).firstElementChild.value;

        return {
          correctAnswer,
          checkedAnswer,
          question
        };
      });
      console.log(questions);
      console.log(csrf)
      fetch('/quiz-results',{
        method:'POST',
        body:JSON.stringify(questions),
        headers:{
          'csrf-token':csrf,
           "Content-Type": "application/json" 
        }
      })
    }
  });
}
