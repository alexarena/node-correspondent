# What?
Correspondent helps you keep user-facing text consistent across your application by allowing you to store that text in a single JSON file.

This approach works especially well for:
- API response messages
- Notification text
- Error/success messages

# Why?

*More specifically....*

**Why do I need this?**

I made this because I need to keep text consistent across a large app that I'm working on. If you don't have that need, you might not need this!

**Why not just import a JSON file?**

Correspondent introduces a few advantages over a static JSON files:
- Variables, Prefixes & Postfixes!
- Safety. If you reference a message that doesn't exist, Correspondent will fallback to an default message.
- Multiple message types in a single file.

# Usage & Demo

The idea behind Correspondent is best expressed through a demo.

Let's say you want to create some response messages for your API. You could define them in a file called `success.json` like this:
```json
{
  "prefix":"Success! ",
  "messages":[
    {"USER_CREATED":"User: {0} was created"},
    {"USER_UPDATED":"User: {0} was updated"}
  ],
  "postfix": ".",
  "unknown":"The action was completed"
}
```
By keeping all user-facing success messages in this file, it's easy to ensure that they maintain consistent content and style.

Accessing the messages you've just defined is easy:

```js
//Note that the path to success.json is relative to your project, not the location of the Correspondent module.
let success = require('correspondent')('./success.json')

success('USER_CREATED','alex') // Returns: "Success! User: Alex was created."

```

While the gist of the message we're sending is clear to the programmer, its actual text is handled by Correspondent through the JSON file defined outside of the code.

What if you wanted to store more than just success messages with Correspondent?

You could just create another instance of Correspondent for that new message type. For example, building off of our earlier code:

```js
//What we had before
let success = require('correspondent')('./success.json')
let err = require('correspondent')('./error.json')

success('USER_CREATED','alex') // Returns: "Success! User: Alex was created."

err('NOT_FOUND') // Returns: the message in error.json that has the key 'NOT_FOUND'

```

Or better yet, you can keep both success and error messages in a single JSON file. To do that, we need to modify our JSON just a bit. Let's make a new file called `messages.json`

```json
{
  "success":{
    "prefix":"Success! ",
    "messages":[
      {"USER_CREATED":"User: {0} was created"},
      {"USER_UPDATED":"User: {0} was updated"}
    ],
    "postfix": ".",
    "unknown":"The action was completed"
  },
  "error":{
    "prefix":"Error! ",
    "messages":[
      {"NOT_FOUND":"The user could not be found"}
    ],
    "postfix": ".",
    "unknown":"Something went wrong"
  }
}
```

Now, here's how we'd access both message types:

```js
let msg = require('correspondent')('./messages.json')

msg('success','USER_CREATED','alex') // Returns: "Success! User: Alex was created."

msg('error','NOT_FOUND') // Returns: "Error! The user could not be found."

```

You can use either method mentioned above to store an arbitrary number of message types.

# Etc.

**Philosophy**

As I mentioned above, Correspondent was created to meet my own needs. Any updates to the module will be consistent with that goal, as I am using it in production.

Because Correspondent is basically an incremental improvement over using a plain JSON file, I don't want to introduce the problems associated with additional dependencies including lack of control, stability, bloat, etc. Thus, it will never make us of any dependencies.

**Coming Eventually**

- Tests, so that its more production-friendly.
- Probably nothing else... there's just not that much to it.

Correspondent is distributed under the MIT license by [Alex Arena](http://alexarena.com).
