<h1 align="center"><a href="https://startgg.com">Live Website.<a/></h1>

# StartGG

A lightweight personal homepage. Currently it includes Reddit and Youtube, as well as some utility search functions.
This webpage is suppose to let you take a glance at Reddit's or Youtube's front pages when you open up your browser.

## Motivation

I have used Reddit for a long time and in recent years, it has become very bloated. What once was a collection of text posts and links
is now weighted down by features which increase load times and obscure the content. 

If you go on Reddit on your phone, in a private tab, what you are going to see is **3 banners** and **no content**.

Reddit's speed index on google lighthouse is 6 seconds. StartGG's is 1.8 seconds.

Same thing for youtube, you go to the website, you see a prompt to Sign In, **no content**.

And lastly, the search bar at the bottom of StartGG is there to conveniently find information.
For example, you want to find out how to remove permanent marker. Pretty staightforward question. You open up a new tab, write "How to remove permanent marker"
in the adress bar, click the first link, what do you get? A long long article which sets up the backstory, the characters, you know the ones.

A smarter search query is a query to a website, which you know has the answer. In my experience, they are community driven websites such as Quora, StackExchange, Reddit.
So the query you have to write is "site:quora.com how to remove permanent marker" or "site:stackexchange.com how to remove permanent marker". The answer is literally in the
first sentence for both of these searches. You can even combine the queries like so: "site:stackexchange.com OR site:quora.com how to remove permanent marker".

In essence a search whitelist for when you want to get straight to the point. The search bar makes these queries, so you wouldn't have to type "site:stackexchange.com OR site:quora.com how to remove permanent marker" on your phone.

## How it works

The server asks Reddit and Youtube for the most popular posts and videos. It processes the information, in other words, throws away all the bloat and caches what's valuable.
The cached resources can be delivered very quickly, because they're ready in the servers memory. Resources are updated every half hour by the server.
Front end receives the resources and builds a simple, lightweight view.

Search bar redirects you to google with the query that you've built.

## In the future

Youtube and Reddit's API's can be utilized further, not only to receive the most popular content, but to allow users to log in and receive their own personalized content
they are used to seeing on those platforms.

More social media views can be implemented.
