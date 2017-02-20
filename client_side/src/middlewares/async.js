export default function({ dispatch }) {
  return next => action => {
    // console.log(action); //STEP1
    //STEP2 if action does not have  a paylod, or the paylod is not thenable, we don't care send it on.
    if(!action.payload || !action.payload.then) {
      return next(action);
    }
    //STEP2
    // console.log('Promise here!', action);
    // next(action);

    // STEP3 make sure the action's promise resolves
    // take everything the action contains (spread operator, but extend over it the RESPONSE, removing the promise in place of response value.
    action.payload
      .then(function(response) {
        //create a new action with the old type,
        //but replace the promise with the response data
        const newAction = { ...action, payload: response};
        //to ensure the action goes through all the middlewares we could potentially have, we do not use the next function
        //but instead we use the dispatch method.
        //dispatch literally means take the action and pretend like its a brand new action, send it through the ENTIRE cycle all over again.
        // on the next loop through,
        // 2 questions:
        //  Q1: Won't there be an infinite loop that occurs if we go back through the cycle?
        //  Answer: No. the action won't be a promise, so it'll hit the early return.
        //  Q2: Why are we using dispatch here in the first place? Why not just use next?
        //  Answer: if this middleware we just wrote is the last in the middleware stack, but the middleware prior in the stack needs to modify that data
        //          the prior middleware has to be called. SO this is a key component of functional programming, ensuring that we put data in, and always get a consistent output.
        dispatch(newAction);
      })
  };
};
//dispatch is a function that is one property of an object we will pull off using destructuring.

//So we have this funky function signature syntax. From this file we're return a function, when ran it's going to return ANOTHER function.
// and when that function is ran, the function that is running will call ANOTHER function that can get called with an action.
//so in ES5 the above would look like:
// export default function ({ dispatch }) {
//   return function(next) {
//     return function(action) {
//       console.log(action)
//       next(action);
//     }
//   }
// }


/* So to review: Our middleware has always had the same signature at the top. We're always going to return a function that gets called with dispatch
 and we're going to return from that another function that gets called with next and we'll return from that another function that gets returned with action
 and inside that last function body is where we can place logic that can be run every single time an action creator returns an action inside of our application.
 Every single action we return from action creator is going to flow through this function.
 So as a caveat, if this was a very large application with a lot of action creators, I would see tons of logs to the console of every single action that got dispatched
 inside of our very large application.
 */