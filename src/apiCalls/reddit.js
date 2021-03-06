import fetch from "node-fetch";

export default async function getRedditPosts(
    subreddit = "Bonsai+Guitar+askscience+gamedev+musictheory+unity"
) {
    console.log("request to reddit");
    let first100posts = [];
    try {
        const first100 = await fetch(
            `https://old.reddit.com/r/${subreddit}/.json?limit=100`
        );
        const dataFirst100 = await first100.json();
        first100posts = dataFirst100.data.children;
    } catch (err) {
        console.log(err);
        return [];
    }
    // Can be made to fetch more than 100 posts, but they are reordered duplicates.

    // // Gets the last id
    // const lastPostId = dataFirst100.data.after;
    // // Last id is used to get messages after it
    // const second100 = await fetch(
    //   `https://www.reddit.com/r/all/.json?limit=100&after=t3_${lastPostId}&count=100`
    // );
    // const dataSecond100 = await second100.json();
    // const second100posts = dataSecond100.data.children;

    // const data = [...first100posts, ...second100posts];

    const filteredPosts = first100posts.filter(
        (post, index, arr) =>
            arr.findIndex((post2) => post2.data.id === post.data.id) === index
    );
    // Remove unnecessary data
    const data = filteredPosts.map((post) => {
        const {
            ups,
            url,
            thumbnail,
            title,
            permalink,
            subreddit,
            id,
            num_comments,
        } = post.data;
        return {
            data: {
                ups,
                url,
                thumbnail,
                title,
                permalink,
                subreddit,
                id,
                num_comments,
            },
        };
    });

    return data;
}
