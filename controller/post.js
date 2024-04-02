import Post from "../models/post.js";

const addPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (title && description) {

            const postData = new Post({ title, description });
            const savedPost = await postData.save();
            if (savedPost) {
                res.status(200).send({ "status": true, "message": "Post Added Successfully" })
            } else {
                res.status(500).send({ "status": false, "message": "Something Went Wrong" });
            }

        } else {
            res.status(400).send({ "status": false, "message": "All fields are required" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "status": false, "message": error.message });
    }
}

const removePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const removedPost = await Post.findByIdAndDelete(postId);
        if (removedPost) {
            res.send({ "status": true, "message": "Post removed successfully", removedPost });
        } else {
            res.send({ "status": false, "message": "Post not found" });
        }

    } catch (error) {
        res.send({ "status": false, "message": error.message })
    }
}

const editPost = async (req, res) => {

}

const getAllPost = async (req, res) => {
    try {

        const posts = await Post.find({});
        res.status(200).send({ "status": true, "message": "Post Fetched Successfully", posts })

    } catch (error) {
        console.error(error);
        res.status(500).json({ "status": false, "message": error.message });
    }
}

export { addPost, removePost, editPost, getAllPost };
