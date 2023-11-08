export function handle(state, action) {

  if (action.input.function === 'signup') {
    const { fullName, email, walletAddress, hashedPassword, userId } = action.input.data;

    const newUser = {
      email,
      userId,
      fullName,
      walletAddress,
      password: hashedPassword
    };
    state.users.push(newUser);
  }

  if (action.input.function === 'addNewHistory') {
    const { text, userId } = action.input.data;

    const newItem = {
      userId,
      searches: [ text ]
    }
    state.history.push(newItem);
  }

  if (action.input.function === 'updateHistory') {
    const { text, userId } = action.input.data;

    const userIndex = state.history.findIndex((user) => user.userId === userId);
    state.history[ userIndex ].searches.push(text)
  }

  if (action.input.function === 'deleteHistory') {
    const { userId } = action.input.data;

    const userIndex = state.history.findIndex((user) => user.userId === userId);
    state.history[ userIndex ].searches.length = 0;
  }

  return { state }
}