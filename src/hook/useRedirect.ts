import { createBrowserHistory } from 'history';

// const useHistory = (to: string) => {
//   const history = createBrowserHistory();

//   history.push(to);
//   // const historyToWithViewTransition = (to: string) => {
//   //   const document = window.document as any;
//   //   if (!document.startViewTransition) {
//   //     navigateTo(to);
//   //   } else {
//   //     document.startViewTransition(() => {
//   //       navigateTo(to);
//   //     });
//   //   }
//   // };

//   // return historyToWithViewTransition;
// };

// export default useHistory;

export const history = createBrowserHistory();
