export const TEST_ACTION = "TEST_ACTION";
export const TEST_HELLO_SAGA = "TEST_HELLO_SAGA";

interface TestAction {
  type: typeof TEST_ACTION;
  payload: string;
}

interface TestAction2 {
  type: typeof TEST_HELLO_SAGA;
  payload: string;
}

export type Action = TestAction | TestAction2;

// export type Action = ReturnType<typeof action>;
