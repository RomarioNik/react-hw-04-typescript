interface FormElements extends HTMLFormControlsCollection {
  search: HTMLInputElement;
}

export interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

// https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/

// function UsernameForm({
//   onSubmitUsername,
// }: {
//   onSubmitUsername: (username: string) => void;
// }) {
//   function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
//     event.preventDefault();
//     onSubmitUsername(event.currentTarget.elements.usernameInput.value);
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="usernameInput">Username:</label>
//         <input id="usernameInput" type="text" />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
