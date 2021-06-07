const apiKey = "?api_key=dce09207-2ffb-4fcb-b3f9-d8b526e437ec"

const main = document.querySelector("main")

const createNewElement = (element, className) => {
    let el = document.createElement(element);
    el.classList.add(className)
    
    return el
}

const appendElement = (element, parent) => {
    parent.appendChild(element)
    return parent
}

const comments = createNewElement("section", "comments")
appendElement(comments, main)

const commentsTitle = createNewElement("h1", "comments__title")
appendElement(commentsTitle, comments)
commentsTitle.innerText = "Join the Conversation"

const commentsContainer = createNewElement("div", "comments__container")
appendElement(commentsContainer, comments)

const commentsForm = createNewElement("form", "comments__form")
appendElement(commentsForm, commentsContainer)

const nameLabel = createNewElement("label", "comments__form--label")
nameLabel.setAttribute("for", "name")
nameLabel.innerText = "NAME"
appendElement(nameLabel,commentsForm)

const nameInput = createNewElement("input", "comments__form--field")
nameInput.setAttribute("type", "text")
nameInput.setAttribute("id", "name")
nameInput.setAttribute("name", "name")
nameInput.setAttribute("placeholder", "Enter your name")
appendElement(nameInput,commentsForm)

const commentLabel = createNewElement("label", "comments__form--label")
commentLabel.setAttribute("for", "comment")
commentLabel.innerText="COMMENT"
appendElement(commentLabel, commentsForm)

const commentInput = createNewElement("textarea", "comments__form--field")
commentInput.setAttribute("type", "text")
commentInput.setAttribute("id", "comment")
commentInput.setAttribute("name", "comment")
commentInput.setAttribute("placeholder", "Add a new comment")
commentInput.setAttribute("rows", "5")
appendElement(commentInput, commentsForm)

const formBtn = createNewElement("button", 'comments__form--button')
formBtn.setAttribute("type", "submit")
formBtn.innerText = "COMMENT"
appendElement(formBtn, commentsForm)






const getCommments = () =>{
    axios
    .get(`https://project-1-api.herokuapp.com/comments${apiKey}`)
    .then((response) => {
        const commentsArray = response.data;
        commentsArray.forEach((comment) => {
            const commentCard = createNewElement("div", "comments__card")
            appendElement(commentCard, commentsContainer)
            
            const commentCardHeader = createNewElement("div", "comments__card--header")
            appendElement(commentCardHeader, commentCard)
            
            const commentName = createNewElement("p", "comments__card--name")
            commentName.innerText = comment.name
            appendElement(commentName, commentCardHeader)

            const commentDate = createNewElement("p", "comments__card--date")
            commentDate.innerText = new Date(comment.timestamp).toLocaleDateString()
            appendElement(commentDate, commentCardHeader)

            const commentText = createNewElement("p", "comments__card--text")
            commentText.innerText = comment.comment
            appendElement(commentText, commentCard)
        })
    })
    .catch((error) => console.log(error))
}

const formSubmit = (event) => {
    event.preventDefault()
    const fullName = event.target.name.value
    const newCommentText = event.target.comment.value
    const newComment = {
        name: fullName,
        comment: newCommentText
    }
    axios
    .post(`https://project-1-api.herokuapp.com/comments${apiKey}`, newComment)
    .then((response) => {
        console.log(response.status)
        getCommments()
    })
    .catch((error) => console.log(error))

    commentsForm.reset()

}

commentsForm.addEventListener("submit", formSubmit)

getCommments()

