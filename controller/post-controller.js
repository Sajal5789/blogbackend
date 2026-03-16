import Post from "../model/post.js";

export const createPost = async (request, response) => {
  try {
    const post = await new Post(request.body);
    post.save();
    return response.status(200).json("post saved successfully ");
  } catch (error) {
    return response.status(500).json(error);
  }
};

export const getAllPosts = async (request, response) => {
  let username = request.query.username;
  console.log("username", username);
  console.log(" request.query", request.query);
  console.log(" request", request);
  let category = request.query.category;
  console.log("category", category);
  let posts;
  try {
    if (username) posts = await Post.find({ username: username });
    else if (category) posts = await Post.find({ categories: category });
    else posts = await Post.find({});
    console.log("posts", posts);
    return response.status(200).json(posts);
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const getPost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    return response.status(200).json(post);
  } catch (error) {
    return response.status(500).json(error);
  }
};

export const updatePost = async (request, response) => {
  try {
    //console.log("requestinserver", request.body);
    //console.log("Updating post with ID:", request.params.id);
    const post = await Post.findById(request.params.id);

    if (!post) {
      return response.status(404).json({ msg: "Post not found" });
    }

    await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

    return response.status(200).json("post updated successfully");
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};
/*
export const deletePost = async (request, response) => {
  try {
    console.log("haaati   m ",request.body);
   // console.log("Deleting post with ID:", request.params.id);
    const post = await Post.findById(request.params.id);
if(!post){
    return response.status(404).json({ msg: "Post not found" });
}
    await post.delete();

    return response.status(200).json("post deleted successfully");
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};*/



    export const deletePost = async (request, response) => {
  try {
console.log("ID received:", request.params.id);
    const post = await Post.findById(request.params.id);

    if (!post) {
      return response.status(404).json({ message: "Post not found" });
    }

    await Post.findByIdAndDelete(request.params.id);

    return response.status(200).json({ message: "Post deleted successfully" });

  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

