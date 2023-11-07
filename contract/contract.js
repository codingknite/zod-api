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

  if (action.input.function === 'test') {
    state.users.push(10)
  }


  return { state }
}