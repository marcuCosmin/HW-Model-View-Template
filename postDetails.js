class PostDetailsView {
    postsModel = new PostsModel();

    usersModel = new UsersModel();

    commentsModel  = new CommentsModel();

    constructor() {

        const id = this.getPostId();
        const post = this.postsModel.getPostById(id);
        this.hidrateHtml(post);

        document.querySelector('[data-post="btn"]').addEventListener('click', () => {
            
            this.handleAddComment(id);
        });
    }

    getPostId() {
        const params = new URLSearchParams(location.search);
        return params.get('id');
    }

    hidrateHtml(data) {

       data.then(post => {

            this.hidrateAuthor(post.userId);
            this.hidrateComments(post.id);

            const titleElem = document.querySelector('[data-post="tile"]');
            const bodyElem = document.querySelector('[data-post="body"]');

            titleElem.innerText = post.title;
            bodyElem.innerText = post.body;
       })
    }

    hidrateAuthor(userId) {

        this.usersModel.getUsersDetails(userId).then(user => {

            document.querySelector('[data-post="author"]').innerText = `Author: ${user.name}`;
        })
    }

    hidrateComments(commentId) {

        this.commentsModel.getCommentsDet(commentId).then(commentsResp => {

            for(const comment of commentsResp) {

                document.querySelector('[data-post="comments"]').innerHTML += `<li> ${comment.body} </li> <br>`;
            }
        })
    }

    handleAddComment(commentId) {

        const comment = document.querySelector('[data-post="comment"]').value;

        if (comment.replace(/\s/g, '').length) {

            this.commentsModel.postComment(commentId, comment).then(commentsConv => document.querySelector('[data-post="comments"]').innerHTML += `<li> ${commentsConv.body} </li> <br>`);

        } else {
            console.log('Could not add comment, the textarea is empty!');
        }
    }
}

new PostDetailsView();