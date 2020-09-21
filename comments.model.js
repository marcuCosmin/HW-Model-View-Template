class CommentsModel {

    getCommentsDet(id) {
        return fetch(`http://jsonplaceholder.typicode.com/posts/${id}/comments`).then(commResUn => commResUn.json());
    }

    postComment(id, comment) {
        
        return fetch(`http://jsonplaceholder.typicode.com/comments`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                body: comment,
                userId: 1
            })
        }).then(postedCommUn => postedCommUn.json());
    }
}