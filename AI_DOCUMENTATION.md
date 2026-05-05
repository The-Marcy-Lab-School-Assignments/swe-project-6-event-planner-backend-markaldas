**1. What did you ask the AI to help you with, and why did you choose to use AI for that specific task?**
I was confused about the difference between checkAuthentication middleware and the getMe function in my server. Both seemed to be checking whether a user was logged in, so I didn’t understand why both were needed. I asked AI:

"I'm working on an API with authentication. I have a getMe function that returns the current logged-in user, and I also have a checkAuthentication middleware that protects routes. They both seem to check if a user is logged in. What is the difference between them and why do I need both?"

I chose to use AI because this wasn’t just a syntax issue or bug, it was a conceptual gap. I needed a clear explanation of how these pieces fit together in the overall server structure, and AI is useful for breaking down concepts and explaining the reasoning behind them.

**2. How did you evaluate whether the AI's output was correct or useful before using it?**

The AI explained that getMe is used to return information about the currently logged-in user to the client, while checkAuthentication is middleware that runs before the controller to block unauthorized requests. This introduced a clearer separation of responsibilities than I initially understood.

To verify this, I looked at my own routes and noticed that protected routes included checkAuthentication before the controller function. I then walked through the request flow step by step to confirm that the middleware runs first and prevents unauthenticated users from reaching the controller. I also tested my understanding by explaining the difference in my own words and making sure it matched how my code behaved.

**3. How did what the AI produced differ from what you ultimately used, and what does that tell you about your own understanding of the problem?**

The AI provided a general explanation of the concepts, but it didn’t directly apply them to my specific codebase. I had to map the explanation onto my own routes and controllers to fully understand it.

Additionally, the AI focused on the conceptual difference, while I extended that understanding to see the design benefit: using middleware avoids repeating authentication checks inside every controller. Instead of writing the same logic multiple times, the middleware centralizes it and keeps the controllers cleaner. This wasn’t explicitly implemented as new code, but it changed how I structured and thought about my existing code.

**4. What did you learn from using AI in this way?**

I learned that getMe and checkAuthentication serve completely different purposes even though they both involve user sessions. getMe is meant for the client to retrieve information about the current user, while checkAuthentication is used by the server to enforce access control before any business logic runs.

More importantly, I gained a better understanding of how middleware fits into the request lifecycle and why separating concerns is important in an MVC architecture. This helped me see how middleware, controllers, and other parts of the server each have distinct roles, which makes the codebase more organized and easier to maintain.
