// Each assessment has a real set of multiple-choice questions with a
// correct answer index. This replaces the previous placeholder that had
// no actual quiz content — the "Start" button just logged to the console.

export const assessments = [
  {
    id: "react-basics",
    courseId: 2,
    title: "React Basics",
    description: "Test your React fundamentals — components, props, state, and hooks.",
    duration: 10,
    questions: [
      { question: "What function lets a function component hold local state?", options: ["useEffect", "useState", "useRef", "useMemo"], correctIndex: 1 },
      { question: "What do you call a plain JavaScript function that returns JSX?", options: ["A class component", "A functional component", "A hook", "A reducer"], correctIndex: 1 },
      { question: "Which prop uniquely identifies items when rendering a list?", options: ["id", "key", "ref", "index"], correctIndex: 1 },
      { question: "What does useEffect run after by default?", options: ["Only the first render", "Every render", "Only unmount", "Never"], correctIndex: 1 },
      { question: "How do you pass data from a parent to a child component?", options: ["State", "Context only", "Props", "Refs"], correctIndex: 2 },
      { question: "Which hook is used for side effects in a functional component?", options: ["useState", "useEffect", "useReducer", "useContext"], correctIndex: 1 },
      { question: "What is the virtual DOM?", options: ["A direct copy of the real DOM", "A lightweight Javascript representation of the DOM", "A browser extension", "A type of database"], correctIndex: 1 },
      { question: "Which hook should be used to access context values?", options: ["useReducer", "useMemo", "useContext", "useEffect"], correctIndex: 2 },
      { question: "What does React.memo do?", options: ["Memoizes the component rendering", "Creates a new state variable", "Updates the DOM directly", "Fetches data"], correctIndex: 0 },
      { question: "How do you conditionally render a component?", options: ["Using if/else inside JSX directly", "Using the ternary operator (cond ? true : false)", "By hiding it with CSS", "You cannot conditionally render components"], correctIndex: 1 }
    ],
  },
  {
    id: "java-fundamentals",
    courseId: 3,
    title: "Java Fundamentals",
    description: "Core Java concepts — types, OOP, and collections.",
    duration: 15,
    questions: [
      { question: "Which keyword is used to inherit a class in Java?", options: ["implements", "extends", "inherits", "super"], correctIndex: 1 },
      { question: "Which of these is NOT a primitive type in Java?", options: ["int", "boolean", "String", "double"], correctIndex: 2 },
      { question: "What does the JVM stand for?", options: ["Java Virtual Machine", "Java Verified Method", "Joint Virtual Memory", "Java Variable Manager"], correctIndex: 0 },
      { question: "Which collection type does not allow duplicate elements?", options: ["ArrayList", "LinkedList", "Set", "Map"], correctIndex: 2 },
      { question: "What is the default value of a boolean instance variable?", options: ["true", "false", "null", "0"], correctIndex: 1 },
      { question: "What is the root class of all classes in Java?", options: ["String", "Object", "Class", "System"], correctIndex: 1 },
      { question: "Which modifier makes a variable accessible only within its own class?", options: ["public", "protected", "private", "default"], correctIndex: 2 },
      { question: "What is method overloading?", options: ["Methods with same name but different parameters", "Methods with same name and same parameters", "Overriding a parent method", "Hiding a method"], correctIndex: 0 },
      { question: "Which keyword is used to prevent a class from being subclassed?", options: ["static", "final", "abstract", "private"], correctIndex: 1 },
      { question: "What is used to handle exceptions in Java?", options: ["try-catch block", "if-else block", "switch statement", "for loop"], correctIndex: 0 }
    ],
  },
  {
    id: "javascript-essentials",
    courseId: 1,
    title: "JavaScript Essentials",
    description: "Core JS concepts — closures, async, and array methods.",
    duration: 10,
    questions: [
      { question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "global", "def"], correctIndex: 1 },
      { question: "What does '===' check that '==' doesn't?", options: ["Nothing different", "Type as well as value", "Only value", "Only type"], correctIndex: 1 },
      { question: "Which array method returns a new array with transformed items?", options: ["forEach", "map", "reduce", "filter"], correctIndex: 1 },
      { question: "What does 'await' do inside an async function?", options: ["Pauses execution until the Promise resolves", "Cancels the Promise", "Runs code in a new thread", "Nothing, it's just documentation"], correctIndex: 0 },
      { question: "What is a closure?", options: ["A syntax error", "A function bundled with its surrounding lexical scope", "A type of loop", "A CSS property"], correctIndex: 1 },
      { question: "Which method is used to add an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correctIndex: 0 },
      { question: "What is NaN?", options: ["Not a Null", "Not a Number", "New array Notation", "Negative and Null"], correctIndex: 1 },
      { question: "Which function is used to parse a JSON string into a JavaScript object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.read()"], correctIndex: 1 },
      { question: "How do you create a Promise?", options: ["new Promise((resolve, reject) => {})", "new Promise()", "create Promise()", "Promise.new()"], correctIndex: 0 },
      { question: "What is 'this' inside an arrow function?", options: ["The global object", "Undefined", "Lexically bound to the enclosing scope", "The function itself"], correctIndex: 2 }
    ],
  },
];
