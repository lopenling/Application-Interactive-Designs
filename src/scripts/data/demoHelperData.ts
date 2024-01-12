export const signInEmailAddress = {
  button: {
    attributes: {
      id: "emailHelp",
    },
    text: "What's the email address?",
  },
  panel: {
    html: `
          <ul>
            <li class="mb-2.5">
              <div>magic@lopenling.org</div>
              <div class="text-xs leading-normal text-stone-500">Shows magic link sign in flow.</div> 
            </li>
            <li class="mb-2.5">
              <div>password@lopenling.org</div>
              <div class="text-xs leading-normal text-stone-500">Shows password sign in flow.</div> 
            </li>
            <li>
              <div>new@lopenling.org</div>
              <div class="text-xs leading-normal text-stone-500">Shows new account creation flow.</div> 
            </li>
          </ul>
        `,
  },
};
