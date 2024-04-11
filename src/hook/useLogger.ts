const useLogger = () => {
  return (storeAPI: any) => (next: any) => (action: any) => {
    // const stateBefore = storeAPI.getState();
    const result = next(action);
    // const stateAfter = storeAPI.getState();
    console.log(storeAPI);

    // console.group("DISPATCH");
    console.log(
      '%cDISPATCH:',
      'color: #03A9F4; font-weight: bold;',
      action.type.replace(/\'/g, ''),
      '\n',
      action.payload
    );
    // console.log(
    //   "%cpayload:",
    //   "color: #4CAF50; font-weight: bold;",
    //   action.payload
    // );
    // console.log("%cstate: %o", "color: #4CAF50; font-weight: bold;", stateAfter);
    // console.groupEnd();

    return result;
  };
};

export default useLogger;
